"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Layout from "@/components/layout/Layout";

export default function ProfilePage() {
  const { user, loading, updateProfile, deleteAccount } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size={128}
                fallbackText={user.name}
                className="rounded-full"
                showBorder={true}
              />
            </div>

            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>

                {user.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </h3>
                    <p className="text-gray-900">{user.bio}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Role:</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {user.role}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Member since:
                    </span>
                    <span className="ml-2 text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
