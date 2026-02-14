import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Changed to local backend for development
  withCredentials: true, // include cookies
});

export default api;
