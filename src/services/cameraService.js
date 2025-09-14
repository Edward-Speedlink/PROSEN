// src/services/cameraService.js
import api from "./api";

// Fetch all camera feeds
export const getCameras = async () => {
  const response = await api.get("/cameras");
  return response.data;
};

// Fetch single camera details
export const getCameraById = async (id) => {
  const response = await api.get(`/cameras/${id}`);
  return response.data;
};

// Start a camera stream
export const startCameraStream = async (id) => {
  const response = await api.post(`/cameras/${id}/start`);
  return response.data;
};

// Stop a camera stream
export const stopCameraStream = async (id) => {
  const response = await api.post(`/cameras/${id}/stop`);
  return response.data;
};

// Optional: analyze footage (AI detection, face recognition etc.)
export const analyzeCamera = async (id) => {
  const response = await api.post(`/cameras/${id}/analyze`);
  return response.data;
};
