// src/App.js
"use client"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./hooks/useToast"
import GlobalStyles from "./styles/GlobalStyles"
import ErrorBoundary from "./components/ui/ErrorBoundary"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <GlobalStyles />
            <Router>
              <AppRoutes />
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
