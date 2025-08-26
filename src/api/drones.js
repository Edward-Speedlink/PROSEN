import { api } from "./config"

export const droneService = {
  requestDrone: async (requestData) => {
    try {
      const response = await api.post("/drones/request", requestData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Drone request failed")
    }
  },

  getDroneStatus: async (droneId) => {
    try {
      const response = await api.get(`/drones/${droneId}/status`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get drone status")
    }
  },

  controlDrone: async (droneId, command) => {
    try {
      const response = await api.post(`/drones/${droneId}/control`, command)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Drone control failed")
    }
  },

  getActiveDrones: async () => {
    try {
      const response = await api.get("/drones/active")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch active drones")
    }
  },

  getDroneHistory: async (droneId) => {
    try {
      const response = await api.get(`/drones/${droneId}/history`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch drone history")
    }
  },
}
