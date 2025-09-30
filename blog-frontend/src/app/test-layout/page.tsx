"use client";

import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";

export default function TestLayoutPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Layout Test Page
          </h1>
          <p className="text-xl text-gray-600">
            This page demonstrates the complete layout with Header, Sidebar,
            Content, and Footer
          </p>
        </div>

        {/* Layout Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📋 Layout Components
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                <strong>Header:</strong> Navigation with user dropdown
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <strong>Sidebar:</strong> User info and navigation menu
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                <strong>Main Content:</strong> Page content area
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                <strong>Footer:</strong> Links and copyright info
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              👤 User Information
            </h2>
            {user ? (
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong>
                  <span
                    className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-800"
                        : user.role === "MODERATOR"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
                <p>
                  <strong>Bio:</strong> {user.bio || "No bio provided"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">
                Please log in to see user information
              </p>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            🎯 Layout Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600 text-sm">
                Layout adapts to different screen sizes with proper mobile
                support
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Consistent Navigation
              </h3>
              <p className="text-gray-600 text-sm">
                Header and sidebar provide consistent navigation across all
                pages
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                User Context
              </h3>
              <p className="text-gray-600 text-sm">
                User information and avatar are displayed consistently
                throughout the app
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700">
            <strong>Note:</strong> This layout structure is used across all
            authenticated pages. Pages like login and register use the same
            layout but with{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">
              showSidebar={false}
            </code>
            to hide the sidebar for a cleaner authentication experience.
          </p>
        </div>
      </div>
    </Layout>
  );
}
