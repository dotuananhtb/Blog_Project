"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-gray-50 border-r min-h-screen">
      <div className="p-6">
        {/* User Info */}
        {user && (
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size={40}
                fallbackText={user.name}
              />
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            {user.bio && (
              <p className="mt-3 text-sm text-gray-600 italic">
                &ldquo;{user.bio}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Main Navigation */}
        <div className="mb-8">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Main Navigation
          </h4>
          <nav className="space-y-1">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>

            <Link
              href="/posts"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              All Posts
            </Link>
          </nav>
        </div>

        {/* User Actions */}
        {user && (
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              My Content
            </h4>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                href="/posts"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                My Posts
              </Link>

              <Link
                href="/posts/create"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Post
              </Link>

              <Link
                href="/profile"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>
            </nav>
          </div>
        )}

        {/* Categories */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Categories
          </h4>
          <nav className="space-y-1">
            <Link
              href="/category/technology"
              className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Technology
              <span className="ml-auto text-xs text-gray-500">24</span>
            </Link>
            <Link
              href="/category/travel"
              className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Travel
              <span className="ml-auto text-xs text-gray-500">18</span>
            </Link>
            <Link
              href="/category/food"
              className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Food
              <span className="ml-auto text-xs text-gray-500">12</span>
            </Link>
            <Link
              href="/category/lifestyle"
              className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Lifestyle
              <span className="ml-auto text-xs text-gray-500">8</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
