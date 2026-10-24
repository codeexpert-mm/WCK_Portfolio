"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Parallax } from "@/components/motion/parallax"
import { EDUCATION, EXPERIENCE, YEARS_OF_EXPERIENCE } from "@/data/resume"

const CHAPTERS: Record<
  string,
  { kicker: string; focus: string; image: string; alt: string }
> = {
  Sourcegraph: {
    kicker: "AI systems",
    focus:
      "Repository indexing, guarded agent tooling, and the release path around them.",
    image: "/experience/real/sf-towers.jpg",
    alt: "San Francisco skyline and the bay in daylight",
  },
  "Grafana Labs": {
    kicker: "Observability",
    focus:
      "Telemetry queries, dashboard plugins, and the time it takes to read an incident.",
    image: "/experience/real/nyc-3.jpg",
    alt: "New York skyline in late daylight",
  },
  "Dell Technologies": {
    kicker: "Enterprise systems",
    focus:
      "Inventory reconciliation, support automation, and safer internal services.",
    image: "/experience/real/office-glass.jpg",
    alt: "Glass office towers photographed from street level",
  },
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function ExperienceSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="experience" className="overflow-x-clip py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Parallax speed={0.18} className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              01 — Career
            </p>
            <h2 className="section-title text-4xl md:text-6xl">
              Professional
              <br />
              Experience
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-border pt-6 lg:col-span-5">
            {[
              [String(YEARS_OF_EXPERIENCE), "Years"],
              [String(EXPERIENCE.length).padStart(2, "0"), "Roles"],
              ["KU", "B.S. CS"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-semibold tracking-tight">{value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Parallax>

        <ol>
          {EXPERIENCE.map((job, index) => {
            const chapter = CHAPTERS[job.company]
            return (
              <motion.li
                key={job.company}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="grid gap-6 border-t border-border py-14 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <div className="flex items-baseline justify-between lg:col-span-3 lg:block">
                  <p className="font-mono text-sm tracking-[0.2em] text-primary/80">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {chapter.kicker}
                  </p>
                  <p className="mt-6 hidden text-sm text-muted-foreground lg:block">
                    {job.start}
                    <span className="mx-2 text-border">/</span>
                    {job.end}
                  </p>
                  <p className="mt-1 hidden max-w-[12rem] text-sm leading-snug text-muted-foreground lg:block">
                    {job.location}
                  </p>
                </div>

                <div className="lg:col-span-9">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        {job.company}
                      </h3>
                      <p className="mt-1 text-muted-foreground">{job.title}</p>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground lg:hidden">
                      {job.start} — {job.end}
                      <span className="mx-2">·</span>
                      {job.location}
                    </p>
                  </div>

                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/90">
                    {chapter.focus}
                  </p>

                  <figure className="mt-8 overflow-hidden rounded-2xl border border-border/70">
                    <div className="relative aspect-[16/8]">
                      <Image
                        src={chapter.image}
                        alt={chapter.alt}
                        fill
                        priority={index === 0}
                        unoptimized
                        sizes="(min-width: 1024px) 68vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </figure>

                  <ul className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
                    {job.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlight}
                        className="grid grid-cols-[1.6rem_minmax(0,1fr)] gap-3 border-t border-border/80 pt-4 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="font-mono text-[10px] text-primary/70">
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="grid gap-8 border-t border-border py-14 lg:grid-cols-12 lg:gap-10 lg:py-16"
        >
          <div className="lg:col-span-3">
            <p className="font-mono text-sm tracking-[0.2em] text-primary/80">ED</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Education
            </p>
            <p className="mt-6 hidden text-sm text-muted-foreground lg:block">
              {EDUCATION.start}
              <span className="mx-2 text-border">/</span>
              {EDUCATION.end}
            </p>
          </div>
          <div className="lg:col-span-9">
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {EDUCATION.school}
            </h3>
            <p className="mt-1 text-muted-foreground">{EDUCATION.degree}</p>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-border/70">
              <div className="relative aspect-[16/7]">
                <Image
                  src="/experience/real/campus2.jpg"
                  alt="Photograph of a university building across a campus lawn"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </figure>
          </div>
        </motion.div>

        <p className="pb-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Photographs by photographers on Unsplash
        </p>
      </div>
    </section>
  )
}
