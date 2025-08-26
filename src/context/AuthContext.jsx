"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState(null) // 'civilian' or 'law_enforcement'

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("prosen-user")
    const savedUserType = localStorage.getItem("prosen-user-type")

    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedUserType)
    }
    setLoading(false)
  }, [])

  const login = async (credentials, type) => {
    setLoading(true)
    try {
      // Simulate API call
      const mockUser = {
        id: Date.now(),
        email: credentials.email,
        name: type === "law_enforcement" ? "Officer Smith" : "John Doe",
        badge: type === "law_enforcement" ? "BADGE001" : null,
        userType: type, 
      }

      setUser(mockUser)
      setUserType(type)
      localStorage.setItem("prosen-user", JSON.stringify(mockUser))
      localStorage.setItem("prosen-user-type", type)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem("prosen-user")
    localStorage.removeItem("prosen-user-type")
  }

  const register = async (userData, type) => {
    setLoading(true)
    try {
      // Simulate API call
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        badge: type === "law_enforcement" ? userData.badge : null,
        userType: type, 
      }

      setUser(mockUser)
      setUserType(type)
      localStorage.setItem("prosen-user", JSON.stringify(mockUser))
      localStorage.setItem("prosen-user-type", type)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isLawEnforcement: userType === "law_enforcement",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
