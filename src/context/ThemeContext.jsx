"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import { theme } from "../styles/theme"
import { GlobalStyles } from "../styles/GlobalStyles"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem("prosen-theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("prosen-theme", newTheme ? "dark" : "light")
  }

  // Pick the correct color palette based on mode
  const modeColors = isDark ? theme.colors.dark : theme.colors.light

  // Merge everything carefully so nothing is lost (spacing, radius, etc.)
  const themeWithMode = {
    ...theme,
    colors: {
      ...theme.colors,   // keep base groups (light/dark sets)
      ...modeColors,     // override with active mode
    },
    spacing: { ...theme.spacing },
    borderRadius: { ...theme.borderRadius },
    breakpoints: { ...theme.breakpoints },
    isDark,
  }

  // 🔎 Debug (optional) – confirm spacing.xl exists
  // console.log("themeWithMode:", themeWithMode)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={themeWithMode}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const ThemeContextProvider = ThemeProvider