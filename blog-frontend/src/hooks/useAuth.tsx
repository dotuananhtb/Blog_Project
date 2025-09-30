"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authAPI, usersAPI } from "@/services/api";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    bio?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = Cookies.get("access_token");
        if (token) {
          const userData = await usersAPI.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        Cookies.remove("access_token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });

      // Store token in cookie
      Cookies.set("access_token", response.access_token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setUser(response.user);
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    bio?: string;
  }) => {
    try {
      const response = await authAPI.register(data);

      // Store token in cookie
      Cookies.set("access_token", response.access_token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setUser(response.user);
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    try {
      authAPI.logout().catch(() => {
        // Ignore logout API errors
      });
    } finally {
      Cookies.remove("access_token");
      setUser(null);
      router.push("/login");
    }
  };

  const updateProfile = async (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }) => {
    try {
      const updatedUser = await usersAPI.updateProfile(data);
      setUser(updatedUser);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Profile update failed");
    }
  };

  const deleteAccount = async () => {
    try {
      await usersAPI.deleteAccount();
      Cookies.remove("access_token");
      setUser(null);
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Account deletion failed");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
