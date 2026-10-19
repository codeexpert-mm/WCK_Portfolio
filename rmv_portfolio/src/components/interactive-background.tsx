"use client"

import * as React from "react"

/**
 * Fixed, behind-everything decorative layer: a faint grid plus a soft accent
 * glow, styled entirely in globals.css.
 *
 * Visible mainly in the hero and through section gaps; sections keep their own
 * backgrounds and blend over the top.
 */
export function InteractiveBackground() {
  return (
    <div className="interactive-bg" aria-hidden>
      <div className="interactive-bg__grid" />
      <div className="interactive-bg__spotlight" />
    </div>
  )
}

export default InteractiveBackground
