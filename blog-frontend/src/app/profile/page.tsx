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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Prepare update data (only send changed fields)
      const updateData: any = {};

      if (formData.name.trim() !== user?.name) {
        updateData.name = formData.name.trim();
      }

      if (formData.bio !== (user?.bio || "")) {
        updateData.bio = formData.bio;
      }

      if (formData.avatar !== (user?.avatar || "")) {
        updateData.avatar = formData.avatar;
      }

      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        await updateProfile(updateData);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
    } catch (err: any) {
      setError(err.message || "Failed to delete account");
    }
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    return null; // Will redirect
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your account information and preferences
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.role === "ADMIN"
                  ? "bg-red-100 text-red-800"
                  : user.role === "MODERATOR"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Moved header styling here */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Profile Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
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

            {/* Profile Information */}
            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      minLength={2}
                      maxLength={50}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      id="avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formData.avatar && (
                      <div className="mt-2 flex items-center space-x-3">
                        <span className="text-sm text-gray-500">Preview:</span>
                        <Avatar
                          src={formData.avatar}
                          alt="Avatar preview"
                          size={40}
                          fallbackText={formData.name || "User"}
                          className="rounded-full"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={500}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name || "",
                          bio: user.bio || "",
                          avatar: user.avatar || "",
                        });
                        setError("");
                        setSuccess("");
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
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
                        {formatDate(user.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Danger Zone
          </h3>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4">
                Confirm Account Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you absolutely sure you want to delete your account? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Yes, Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
