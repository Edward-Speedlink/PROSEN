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
  const [isDark, setIsDark] = useState(true) // Default to dark mode for law enforcement

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

  const themeWithMode = {
    ...theme,
    isDark,
  }

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
