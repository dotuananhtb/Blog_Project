"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function CreatePostPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Post created successfully!");

      // Redirect to posts page after a short delay
      setTimeout(() => {
        router.push("/posts");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateExcerpt = () => {
    if (formData.content) {
      const plainText = formData.content.replace(/<[^>]*>/g, "");
      const excerpt = plainText.substring(0, 150);
      setFormData((prev) => ({
        ...prev,
        excerpt: excerpt + (plainText.length > 150 ? "..." : ""),
      }));
    }
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
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Post
            </h1>
            <p className="text-gray-600 mt-1">
              Share your thoughts with the world
            </p>
          </div>
          <Link
            href="/posts"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Back to Posts
          </Link>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                maxLength={200}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your post title..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your post content here..."
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500">
                  {formData.content.length} characters
                </p>
                <button
                  type="button"
                  onClick={generateExcerpt}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Generate Excerpt
                </button>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                maxLength={300}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of your post..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.excerpt.length}/300 characters
              </p>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {formData.status === "DRAFT"
                  ? "Save as draft to continue editing later"
                  : "Publish to make your post visible to everyone"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Creating..."
                  : formData.status === "PUBLISHED"
                  ? "Create & Publish"
                  : "Save as Draft"}
              </button>

              <Link
                href="/posts"
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>

            {/* Preview Section */}
            {(formData.title || formData.excerpt) && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Preview
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {formData.title && (
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {formData.title}
                    </h4>
                  )}
                  {formData.excerpt && (
                    <p className="text-gray-600 mb-3">{formData.excerpt}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <span>By {user.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        formData.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {formData.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
