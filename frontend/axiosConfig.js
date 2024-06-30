// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://homelink-nyna.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
