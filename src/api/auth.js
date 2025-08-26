import { api } from "./config"

export const authService = {
  login: async (credentials, userType) => {
    try {
      const response = await api.post("/auth/login", {
        ...credentials,
        userType,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  },

  register: async (userData, userType) => {
    try {
      const response = await api.post("/auth/register", {
        ...userData,
        userType,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh")
      return response.data
    } catch (error) {
      throw new Error("Token refresh failed")
    }
  },
}
