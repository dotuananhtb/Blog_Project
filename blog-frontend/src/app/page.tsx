"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: "DRAFT" | "PUBLISHED";
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "Welcome to My Blog",
            content:
              "This is my first blog post about starting this amazing journey...",
            excerpt:
              "Introduction to my blogging journey and what you can expect to find here.",
            status: "PUBLISHED",
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-01-15T10:00:00Z",
            author: {
              id: "1",
              name: "John Doe",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
            },
          },
          {
            id: "2",
            title: "Getting Started with React",
            content:
              "React is an amazing library for building user interfaces...",
            excerpt:
              "A beginner's guide to understanding React and its core concepts.",
            status: "PUBLISHED",
            created_at: "2024-01-16T14:30:00Z",
            updated_at: "2024-01-16T14:30:00Z",
            author: {
              id: "2",
              name: "Jane Smith",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
            },
          },
          {
            id: "3",
            title: "The Future of Web Development",
            content:
              "Web development is constantly evolving with new technologies...",
            excerpt:
              "Exploring the latest trends and technologies shaping the future of web development.",
            status: "PUBLISHED",
            created_at: "2024-01-17T09:15:00Z",
            updated_at: "2024-01-17T09:15:00Z",
            author: {
              id: "1",
              name: "John Doe",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
            },
          },
        ];
        setPosts(mockPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BlogApp
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing stories and share your thoughts with the world
          </p>

          {!user && (
            <div className="space-x-4">
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {user && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-blue-700 mb-4">
                Ready to share your next story?
              </p>
              <Link
                href="/posts/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Create New Post
              </Link>
            </div>
          )}
        </div>

        {/* Latest Posts Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
            <Link
              href="/posts"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Posts →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-8">
              {posts.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/posts/${post.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Avatar
                            src={post.author.avatar}
                            alt={post.author.name}
                            size={24}
                            fallbackText={post.author.name}
                            className="rounded-full"
                          />
                          <span className="font-medium">
                            {post.author.name}
                          </span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(post.created_at)}</span>
                        <span>•</span>
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No posts yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Be the first to share your story.
              </p>
              {user && (
                <div className="mt-6">
                  <Link
                    href="/posts/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create Your First Post
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {!user && (
          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to start your blogging journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community of writers and share your unique perspective
              with the world.
            </p>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
