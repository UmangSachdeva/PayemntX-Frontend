import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API, // Replace with your API base URL
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Replace with your token retrieval logic

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosPrivate;
