"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight, Github, Sparkles } from "lucide-react"
import { selectedProjects, type SelectedProject } from "@/data/selected-work"

const cardClass =
  "relative h-full rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-500 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_-25px_rgba(34,211,238,0.35)]"

function ScreenshotCard({ project }: { project: SelectedProject }) {
  return (
    <div className={`${cardClass} group p-3`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/60 bg-muted">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Soft sheen so bright screenshots sit inside the dark frame. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5" />
      </div>
    </div>
  )
}

function DetailsCard({ project }: { project: SelectedProject }) {
  return (
    <div className={`${cardClass} flex flex-col p-6 md:p-8`}>
      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tech.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 py-1 pl-1 pr-3 text-sm font-semibold text-foreground/90 transition-colors hover:border-cyan-400/50"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
              <Icon className="h-3.5 w-3.5" />
            </span>
            {name}
          </li>
        ))}
      </ul>

      {project.github && (
        <div className="mt-auto pt-8">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-700 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-300"
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      )}
    </div>
  )
}

function Milestone({ project, index }: { project: SelectedProject; index: number }) {
  const ref = React.useRef<HTMLLIElement>(null)
  // The node lights up once the row reaches the lower ~60% of the viewport,
  // roughly when the progress line arrives at it.
  const reached = useInView(ref, { margin: "0px 0px -40% 0px" })
  const reduceMotion = useReducedMotion()
  const imageLeft = index % 2 === 0
  const number = String(index + 1).padStart(2, "0")

  // Whole rows alternate their entry side: right, left, right, …
  const fromLeft = index % 2 === 1
  // The screenshot is always the card farther from the entry side, so it
  // trails slightly behind the details card.
  const slide = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, x: fromLeft ? -120 : 120 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <li ref={ref} className="relative grid gap-5 pl-14 md:grid-cols-2 md:gap-x-28 md:pl-0">
      {/* Timeline node */}
      <div className="absolute left-5 top-6 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <div
          className={`grid h-11 w-11 place-items-center rounded-full border bg-background text-xs font-bold tracking-wider transition-all duration-500 ${
            reached
              ? "border-cyan-400 text-cyan-600 shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_0_24px_rgba(34,211,238,0.55)] dark:text-cyan-300"
              : "border-border text-muted-foreground"
          }`}
        >
          {number}
        </div>
      </div>

      <motion.div {...slide(0.12)} className={imageLeft ? "md:order-1" : "md:order-2"}>
        <ScreenshotCard project={project} />
      </motion.div>
      <motion.div {...slide(0)} className={imageLeft ? "md:order-2" : "md:order-1"}>
        <DetailsCard project={project} />
      </motion.div>
    </li>
  )
}

export function SelectedWorkSection() {
  const timelineRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.6"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="work" aria-labelledby="work-heading" className="overflow-x-clip py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Selected Work
          </span>
          <h2
            id="work-heading"
            className="mt-5 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl"
          >
            <span className="block text-foreground">Scroll through</span>
            <span className="block section-title">
              My project milestones
            </span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Track + scroll-driven fill */}
          <div
            aria-hidden
            className="absolute bottom-0 left-5 top-0 w-[3px] -translate-x-1/2 rounded-full bg-border md:left-1/2"
          >
            <motion.div
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
              style={{ scaleY: progress }}
            />
          </div>

          <ol className="relative space-y-12 md:space-y-16">
            {selectedProjects.map((project, index) => (
              <Milestone key={project.title} project={project} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
