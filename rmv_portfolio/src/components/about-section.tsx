"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download, MapPin, Coffee, Code, GraduationCap } from "lucide-react"
import { WorkAvailability } from "@/components/work-availability"
import { Parallax } from "@/components/motion/parallax"


import { ResumeUnavailableModal } from "@/components/resume-unavailable-modal"
import { downloadResume } from "@/lib/resume"
import { PERSON } from "@/lib/site"
import { EDUCATION, EXPERIENCE, YEARS_OF_EXPERIENCE } from "@/data/resume"

export function AboutSection() {
  const [showResumeModal, setShowResumeModal] = React.useState(false)

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Parallax speed={0.25} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </Parallax>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image and Stats */}
          <Parallax speed={0.15} className="relative">
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-square relative rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <Image
                    src="/about-illustration.jpg"
                    alt={`${PERSON.name} - ${PERSON.jobTitle}`}
                    fill
                    className="object-cover object-top"
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Code className="w-6 h-6" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground p-3 rounded-full"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Coffee className="w-6 h-6" />
                </motion.div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-card p-4 rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-primary mb-1">{YEARS_OF_EXPERIENCE}</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border text-center">
                <div className="text-2xl font-bold text-primary mb-1">{EXPERIENCE.length}</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
            </div>
          </Parallax>

          {/* Right Column - Bio Content */}
          <Parallax speed={0.35} className="space-y-6">
            {/* Bio Text */}
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                Hello! I&apos;m <span className="font-semibold text-primary">{PERSON.name}</span>,
                a full-stack engineer with {YEARS_OF_EXPERIENCE} years of software development
                experience across enterprise platforms and AI-enabled tools.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I&apos;ve architected Go and gRPC services, shipped React interfaces, and improved
                LLM-assisted workflows with guarded tool integrations and measurable latency
                reductions — most recently as a Senior Full Stack AI Engineer at Sourcegraph,
                and before that at Grafana Labs and Dell Technologies.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I drive architecture decisions across distributed engineering teams, with a focus on
                reliability, schema-validated contracts, and AI agent tooling (MCP, A2A, Google ADK,
                and RAG) that stays inspectable and safe.
              </p>
            </div>

            {/* Personal Details */}
            <div className="grid sm:grid-cols-2 gap-4 py-6 border-t border-border">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">
                  {PERSON.locality}, {PERSON.region}
                </span>
              </div>

              {/* Work Availability Status - Change props as needed */}
              <WorkAvailability available={true} status={2} />

              <div className="flex items-center gap-3 sm:col-span-2">
                <GraduationCap className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  B.S. Computer Science, {EDUCATION.school}
                </span>
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="pt-4">
              <motion.button
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    if (!(await downloadResume())) setShowResumeModal(true)
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.button>
            </div>
          </Parallax>
        </div>
      </div>

      {/* Resume Unavailable Modal */}
      <ResumeUnavailableModal
        open={showResumeModal}
        onOpenChange={setShowResumeModal}
      />
    </section>
  )
}
