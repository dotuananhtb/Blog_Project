"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <div className="p-6">
        {/* User Info */}
        {user && (
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size={48}
                fallbackText={user.name}
                className="rounded-full"
                showBorder={true}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' 
                      ? 'bg-red-100 text-red-800' 
                      : user.role === 'MODERATOR'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            {user.bio && (
              <p className="mt-3 text-sm text-gray-700 italic border-l-2 border-blue-300 pl-3">
                &ldquo;{user.bio}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main Navigation
            </h4>
          </div>
          
          <Link
            href="/"
            className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500"
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
            className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500"
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

          {user && (
            <>
              <div className="my-4 border-t border-gray-200"></div>
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  My Content
                </h4>
              </div>
              
              <Link
                href="/my-posts"
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-500"
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
                <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                  0
                </span>
              </Link>

              <Link
                href="/create-post"
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-500"
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
                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500"
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
                Profile Settings
              </Link>
            </>
          )}
        </nav>

        {/* Categories */}
        <div className="mt-8">
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h4>
          </div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Technology
              </div>
              <span className="text-xs text-gray-400">24</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Travel
              </div>
              <span className="text-xs text-gray-400">18</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Food
              </div>
              <span className="text-xs text-gray-400">12</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Lifestyle
              </div>
              <span className="text-xs text-gray-400">9</span>
            </a>
          </nav>
        </div>
      </div>
    </aside>
  );
}
