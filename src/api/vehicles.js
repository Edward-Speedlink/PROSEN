import { api } from "./config"

export const vehicleService = {
  registerVehicle: async (vehicleData) => {
    try {
      const response = await api.post("/vehicles/register", vehicleData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Vehicle registration failed")
    }
  },

  getUserVehicles: async () => {
    try {
      const response = await api.get("/vehicles/user")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch vehicles")
    }
  },

  updateVehicle: async (vehicleId, updateData) => {
    try {
      const response = await api.put(`/vehicles/${vehicleId}`, updateData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Vehicle update failed")
    }
  },

  deleteVehicle: async (vehicleId) => {
    try {
      const response = await api.delete(`/vehicles/${vehicleId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Vehicle deletion failed")
    }
  },

  searchVehicles: async (searchParams) => {
    try {
      const response = await api.get("/vehicles/search", { params: searchParams })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Vehicle search failed")
    }
  },
}
