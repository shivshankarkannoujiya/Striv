import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000/api/v1"
      : "/api/v1",
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});
