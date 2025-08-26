import { api } from "./config"

export const lawEnforcementService = {
  getComplaints: async () => {
    try {
      const response = await api.get("/law-enforcement/complaints")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch complaints")
    }
  },

  updateComplaintStatus: async (complaintId, status) => {
    try {
      const response = await api.put(`/law-enforcement/complaints/${complaintId}`, {
        status,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update complaint")
    }
  },

  trackSuspect: async (suspectData) => {
    try {
      const response = await api.post("/law-enforcement/track-suspect", suspectData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Suspect tracking failed")
    }
  },

  getSuspectLocation: async (suspectId) => {
    try {
      const response = await api.get(`/law-enforcement/suspects/${suspectId}/location`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get suspect location")
    }
  },

  getTrafficOffenders: async () => {
    try {
      const response = await api.get("/law-enforcement/traffic-offenders")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch traffic offenders")
    }
  },
}
