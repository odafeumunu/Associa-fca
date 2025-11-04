import axios from "axios";

// Used for login, register, password reset, etc.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
