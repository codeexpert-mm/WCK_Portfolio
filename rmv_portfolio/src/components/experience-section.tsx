"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react"
import { Parallax } from "@/components/motion/parallax"
import { EXPERIENCE, EDUCATION } from "@/data/resume"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Parallax speed={0.25} className="text-center mb-16">
          <h2 className="p-4 text-4xl md:text-5xl mb-4 section-title">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A decade of building enterprise platforms, distributed services, and AI-enabled developer tools
          </p>
        </Parallax>

        {/* Timeline */}
        <ol className="relative space-y-8 border-l border-border ml-3 sm:ml-4">
          {EXPERIENCE.map((job) => (
            <li key={job.company} className="relative pl-8 sm:pl-10">
              {/* Timeline marker */}
              <span className="absolute -left-[13px] top-8 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
                <Briefcase className="h-3 w-3" />
              </span>

              <Parallax speed={0.15}>
                <motion.article
                  className="group bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 p-6 sm:p-8"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {job.company}
                      </h3>
                      <p className="font-semibold text-muted-foreground">{job.title}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:text-right">
                      <span className="inline-flex items-center gap-2 sm:justify-end">
                        <Calendar className="w-4 h-4" />
                        {job.start} – {job.end}
                      </span>
                      <span className="inline-flex items-center gap-2 sm:justify-end">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 list-disc pl-5 marker:text-primary">
                    {job.highlights.map((highlight) => (
                      <li key={highlight} className="text-muted-foreground leading-relaxed">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Parallax>
            </li>
          ))}
        </ol>

        {/* Education */}
        <Parallax speed={0.2} className="mt-16">
          <div className="flex items-start gap-4 bg-card rounded-xl border border-border p-6 sm:p-8">
            <div className="p-3 rounded-full bg-primary/10 shrink-0">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{EDUCATION.school}</h3>
                <p className="text-muted-foreground">{EDUCATION.degree}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {EDUCATION.start} – {EDUCATION.end}
              </span>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  )
}
