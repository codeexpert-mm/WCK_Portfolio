import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () => {
  const accelerateUrl = process.env.PRISMA_DATABASE_URL
  if (!accelerateUrl) {
    throw new Error('PRISMA_DATABASE_URL is not set')
  }
  // Prisma 7 with Accelerate: accelerateUrl is required
  return new PrismaClient({ accelerateUrl }).$extends(withAccelerate())
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Created lazily on first use, not at import time, so `next build` (which
// evaluates route modules) succeeds even when the DB env var is absent.
export function getPrisma() {
  const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
  globalThis.prismaGlobal = prisma
  return prisma
}
