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
import { authAPI, usersAPI, User } from "@/services/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }) => Promise<void>;
  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for cookie management
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  if (typeof document !== "undefined") {
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  // Also try js-cookie as backup
  try {
    Cookies.set(name, value, {
      expires: days,
      secure: false,
      sameSite: "lax",
    });
  } catch (e) {
    console.error("js-cookie failed:", e);
  }
};

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

const removeCookie = (name: string) => {
  Cookies.remove(name);
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = getCookie("access_token");
        console.log("Loading user, token found:", !!token);
        if (token) {
          const response = await usersAPI.getProfile();
          if (response.success) {
            setUser(response.data);
            console.log("User loaded successfully:", response.data);
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        removeCookie("access_token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });

      if (response.success) {
        // Store token using helper function
        setCookie("access_token", response.data.access_token, 7);
        console.log("Cookie set, all cookies:", document.cookie);

        // Set user immediately in context
        setUser(response.data.user);

        console.log("Login successful, user set:", response.data.user);
        console.log("Token saved:", response.data.access_token);

        // Don't redirect here, let the login page handle it
        return;
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    bio?: string;
    avatar?: string;
  }) => {
    try {
      setLoading(true);
      const response = await authAPI.register(data);

      if (response.success) {
        // Store token using helper function (same as login)
        setCookie("access_token", response.data.access_token, 7);
        console.log("Cookie set, all cookies:", document.cookie);

        setUser(response.data.user);

        console.log("Registration successful, user set:", response.data.user);
        console.log("Token saved:", response.data.access_token);

        // Don't redirect here, let the register page handle it
        return;
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authAPI.logout();
    } catch (error) {
      // Ignore logout API errors
      console.error("Logout API error:", error);
    } finally {
      // Clear cookie using helper function
      removeCookie("access_token");
      setUser(null);
      setLoading(false);
      router.push("/login");
    }
  };

  const updateProfile = async (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }) => {
    try {
      const response = await usersAPI.updateProfile(data);
      if (response.success) {
        setUser(response.data);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Profile update failed";
      throw new Error(errorMessage);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await usersAPI.getProfile();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Don't throw error, just log it
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.deleteAccount();
      if (response.success) {
        Cookies.remove("access_token");
        setUser(null);
        router.push("/login");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Account deletion failed";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
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
