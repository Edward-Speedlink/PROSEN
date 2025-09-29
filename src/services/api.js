// src/services/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/", // http://192.168.10.28:5000/// change this to your backend base URL
  // baseURL: " http://192.168.10.27:5000/api/", // http://192.168.10.28:5000/// change this to your backend base URL
  baseURL: "https://prosen1.speedlinkng.com:443/api", // http://192.168.10.28:5000/// change this to your backend base URL

  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally: add request/response interceptors
// api.interceptors.request.use(config => { ... });

export default api;
