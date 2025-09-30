import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      Cookies.remove("access_token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    name: string;
    bio?: string;
  }) => {
    const response = await api.post("/api/v1/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/api/v1/auth/login", data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/api/v1/auth/logout");
    return response.data;
  },
};

// Users API calls
export const usersAPI = {
  getProfile: async () => {
    const response = await api.get("/api/v1/users/profile");
    return response.data;
  },

  updateProfile: async (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }) => {
    const response = await api.put("/api/v1/users/profile", data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete("/api/v1/users/profile");
    return response.data;
  },
};

// Posts API calls (placeholder)
export const postsAPI = {
  getAllPosts: async () => {
    const response = await api.get("/api/v1/posts");
    return response.data;
  },

  getMyPosts: async () => {
    const response = await api.get("/api/v1/posts/my-posts");
    return response.data;
  },
};

export default api;
