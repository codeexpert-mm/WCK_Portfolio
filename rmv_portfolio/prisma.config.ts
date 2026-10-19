import { config } from 'dotenv';
import { resolve } from 'path';
import type { PrismaConfig } from "prisma";

// Load .env.local file (absent on CI/Vercel, where env vars come from the dashboard)
config({ path: resolve(process.cwd(), '.env.local') });

// DATABASE_URL is only needed for migrate/db push/studio. `prisma generate`
// (run on install and build) doesn't connect to the DB, so don't require it.
const databaseUrl = process.env.DATABASE_URL;

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(databaseUrl && {
    datasource: {
      url: databaseUrl, // Direct connection for migrations
    },
  }),
} satisfies PrismaConfig;
