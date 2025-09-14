// PROSEN Theme Configuration
export const theme = {
  colors: {
    primary: {
      deepBlue: "#0A192F", // Updated to match specification
      darkNavy: "#0A192F",
      neonCyan: "#00E5FF", // New highlight color
    },
    secondary: {
      red: "#FF1744", // Updated to match specification for alerts/danger
      amber: "#FFB703",
    },
    supportive: {
      coolGray: "#90A4AE", // Updated to match specification
      lightGray: "#ECEFF1", // Updated to match specification
      teal: "#06D6A0",
    },
    // Theme variants
    light: {
      background: "#ECEFF1",
      surface: "#FFFFFF",
      text: "#0A192F",
      textSecondary: "#90A4AE",
      accent: "#00E5FF",
      danger: "#FF1744",
    },
    dark: {
      background: "#0A192F", // Updated primary background
      surface: "#1A2332", // Slightly lighter than background
      text: "#ECEFF1",
      textSecondary: "#90A4AE",
      accent: "#00E5FF", // Neon cyan for interactive elements
      danger: "#FF1744", // Accent red for alerts
    },
  },
  fonts: {
    heading: "Poppins, sans-serif", // Updated to Poppins as requested
    body: "Poppins, sans-serif", // Updated to Poppins as requested
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    sm: "0 2px 4px rgba(13, 27, 42, 0.1)",
    md: "0 4px 8px rgba(13, 27, 42, 0.15)",
    lg: "0 8px 16px rgba(13, 27, 42, 0.2)",
  },
  transitions: {
    fast: "0.15s ease-in-out",
    normal: "0.3s ease-in-out",
    slow: "0.5s ease-in-out",
  },
}