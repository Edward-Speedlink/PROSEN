import { api } from "./config"

export const cameraService = {
  getCameraFeeds: async () => {
    try {
      const response = await api.get("/cameras/feeds")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch camera feeds")
    }
  },

  getCameraById: async (cameraId) => {
    try {
      const response = await api.get(`/cameras/${cameraId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch camera")
    }
  },

  runFaceRecognition: async (cameraId, imageData) => {
    try {
      const response = await api.post(`/cameras/${cameraId}/face-recognition`, {
        imageData,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Face recognition failed")
    }
  },

  getCameraStatus: async (cameraId) => {
    try {
      const response = await api.get(`/cameras/${cameraId}/status`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get camera status")
    }
  },

  updateCameraSettings: async (cameraId, settings) => {
    try {
      const response = await api.put(`/cameras/${cameraId}/settings`, settings)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update camera settings")
    }
  },
}
