import axios from 'axios';

// Global API instance (Best Practice)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default api;