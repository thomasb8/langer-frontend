import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_LANGER_BACKEND_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})
