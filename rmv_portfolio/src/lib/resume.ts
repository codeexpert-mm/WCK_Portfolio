import { RESUME_AVAILABLE, RESUME_FILE_NAME } from "@/constants/resume"
import { trackResumeDownload } from "@/lib/analytics"

/**
 * Triggers the resume download and fires analytics/notification tracking.
 * Returns `false` (without doing anything) when the resume is not available,
 * so callers can surface the "unavailable" modal instead.
 */
export async function downloadResume(): Promise<boolean> {
  if (!RESUME_AVAILABLE) return false

  await trackResumeDownload()

  const link = document.createElement("a")
  link.href = "/resume.pdf"
  link.download = RESUME_FILE_NAME
  link.target = "_blank"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  return true
}
