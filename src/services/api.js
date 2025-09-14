// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/", // change this to your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally: add request/response interceptors
// api.interceptors.request.use(config => { ... });

export default api;
