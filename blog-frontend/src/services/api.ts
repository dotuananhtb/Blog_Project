import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies
});

// Helper function to get cookie (same as in useAuth)
const getCookie = (name: string): string | null => {
  // Try js-cookie first
  let value = Cookies.get(name);

  // If not found, try document.cookie
  if (!value && typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const cookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${name}=`)
    );
    if (cookie) {
      value = cookie.split("=")[1];
    }
  }

  return value || null;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
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

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

// Auth API calls
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/api/v1/auth/register", data);
    return response.data;
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/api/v1/auth/login", data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post("/api/v1/auth/logout");
    return response.data;
  },
};

// Users API calls
export const usersAPI = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/api/v1/users/profile");
    return response.data;
  },

  updateProfile: async (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }): Promise<ApiResponse<User>> => {
    const response = await api.put("/api/v1/users/profile", data);
    return response.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/api/v1/users/${id}`);
    return response.data;
  },

  deleteAccount: async (): Promise<ApiResponse<null>> => {
    const response = await api.delete("/api/v1/users/profile");
    return response.data;
  },
};

// Posts API calls (placeholder)
export const postsAPI = {
  getAllPosts: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/api/v1/posts");
    return response.data;
  },

  getMyPosts: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/api/v1/posts/my-posts");
    return response.data;
  },

  createPost: async (data: {
    title: string;
    content: string;
    excerpt?: string;
  }): Promise<ApiResponse<any>> => {
    const response = await api.post("/api/v1/posts", data);
    return response.data;
  },

  updatePost: async (
    id: string,
    data: {
      title?: string;
      content?: string;
      excerpt?: string;
    }
  ): Promise<ApiResponse<any>> => {
    const response = await api.put(`/api/v1/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/api/v1/posts/${id}`);
    return response.data;
  },
};

export default api;
