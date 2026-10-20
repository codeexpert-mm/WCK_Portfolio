"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"


import { ResumeUnavailableModal } from "@/components/resume-unavailable-modal"
import { downloadResume } from "@/lib/resume"
import { scrollTo } from "@/lib/smooth-scroll"
import { GITHUB_USERNAME, PERSON } from "@/lib/site"

interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  // The Projects section only renders when a GitHub account is configured.
  ...(GITHUB_USERNAME ? [{ name: "Projects", href: "#projects" }] : []),
  { name: "Contact", href: "#contact" },
]

/** Idle time after a nav click's smooth scroll before the scroll spy resumes. */
const SCROLL_SETTLE_MS = 200

/** Monogram for the logo, e.g. "William Christian Kolega" → "WCK". */
const MONOGRAM = PERSON.name
  .split(/\s+/)
  .map((part) => part[0])
  .join("")
  .toUpperCase()

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [showResumeModal, setShowResumeModal] = React.useState(false)

  // While a nav click is smooth-scrolling, the scroll spy is paused so the
  // sections passed on the way don't flash in the nav. It resumes once the
  // scroll has been idle for SCROLL_SETTLE_MS.
  const clickLockRef = React.useRef(false)
  const settleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const releaseLockWhenSettled = React.useCallback(() => {
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
    settleTimerRef.current = setTimeout(() => {
      clickLockRef.current = false
    }, SCROLL_SETTLE_MS)
  }, [])

  // Smooth scroll to section (via Lenis when available)
  const scrollToSection = (href: string) => {
    setActiveSection(href.substring(1))
    clickLockRef.current = true
    releaseLockWhenSettled()
    scrollTo(href)
    setIsOpen(false)
  }

  // Handle scroll effects
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      if (clickLockRef.current) {
        releaseLockWhenSettled()
        return
      }

      // Sections overlap as they slide over each other, so instead of looking
      // for the one spanning a fixed line, take the last section whose top has
      // passed the activation line.
      const sections = navItems.map(item => item.href.substring(1))
      const activationLine = window.innerHeight * 0.4
      let current = sections[0]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top <= activationLine) {
          current = section
        }
      }

      // The last section can be too short to ever reach the line, so the
      // bottom of the page always selects it.
      const atBottom =
        window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - 2
      if (atBottom) current = sections[sections.length - 1]

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current)
    }
  }, [releaseLockWhenSettled])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {MONOGRAM}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={async () => {
                if (!(await downloadResume())) setShowResumeModal(true)
              }}
              className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
            >
              Download CV
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b border-border">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-border">
              <button
                onClick={async () => {
                  if (!(await downloadResume())) setShowResumeModal(true)
                  setIsOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent transition-colors"
              >
                Download CV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Unavailable Modal */}
      <ResumeUnavailableModal 
        open={showResumeModal} 
        onOpenChange={setShowResumeModal} 
      />
    </nav>
  )
}