"use client"
import { useEffect } from "react"

export const ScreenReaderAnnouncer = ({ message, priority = "polite" }) => {
  useEffect(() => {
    if (message) {
      const announcer = document.createElement("div")
      announcer.setAttribute("aria-live", priority)
      announcer.setAttribute("aria-atomic", "true")
      announcer.setAttribute("class", "sr-only")
      announcer.style.position = "absolute"
      announcer.style.left = "-10000px"
      announcer.style.width = "1px"
      announcer.style.height = "1px"
      announcer.style.overflow = "hidden"

      document.body.appendChild(announcer)
      announcer.textContent = message

      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 1000)
    }
  }, [message, priority])

  return null
}

export const useFocusTrap = (isActive) => {
  useEffect(() => {
    if (!isActive) return

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener("keydown", handleTabKey)
    firstElement?.focus()

    return () => {
      document.removeEventListener("keydown", handleTabKey)
    }
  }, [isActive])
}

export default ScreenReaderAnnouncer
