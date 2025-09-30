"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BlogApp
        </h1>

        {user ? (
          // Khi user đã đăng nhập
          <>
            <p className="text-xl text-gray-600 mb-8">
              Welcome back,{" "}
              <span className="font-semibold text-blue-600">{user.name}</span>!
              Ready to share your thoughts?
            </p>

            <div className="space-x-4">
              <Link
                href="/create-post"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium"
              >
                Create New Post
              </Link>
              <Link
                href="/posts"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-md text-lg font-medium"
              >
                Browse Posts
              </Link>
              <Link
                href="/my-posts"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium"
              >
                My Posts
              </Link>
            </div>
          </>
        ) : (
          // Khi user chưa đăng nhập
          <>
            <p className="text-xl text-gray-600 mb-8">
              Share your thoughts with the world
            </p>

            <div className="space-x-4">
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium"
              >
                Get Started
              </Link>
              <Link
                href="/posts"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-md text-lg font-medium"
              >
                Browse Posts
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
