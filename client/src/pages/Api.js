import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080", // Use port 8080
  // Other configuration options
});

export default api;
