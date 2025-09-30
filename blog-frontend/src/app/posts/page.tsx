"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
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

export default function PostsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setPostsLoading(true);
        // Mock data - replace with actual API call
        const mockPosts: Post[] = [
          {
            id: "1",
            title: "Welcome to My Blog",
            content: "This is my first blog post...",
            excerpt: "Introduction to my blogging journey",
            status: "PUBLISHED",
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-01-15T10:00:00Z",
            author: {
              id: user?.id || "1",
              name: user?.name || "User",
              avatar: user?.avatar,
            },
          },
          {
            id: "2",
            title: "Draft Post About React",
            content: "This is a draft post about React development...",
            excerpt: "Learning React in 2024",
            status: "DRAFT",
            created_at: "2024-01-16T14:30:00Z",
            updated_at: "2024-01-16T14:30:00Z",
            author: {
              id: user?.id || "1",
              name: user?.name || "User",
              avatar: user?.avatar,
            },
          },
        ];
        setPosts(mockPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setPostsLoading(false);
      }
    };

    if (user) {
      loadPosts();
    }
  }, [user]);

  const filteredPosts = posts.filter((post) => {
    if (filter === "ALL") return true;
    return post.status === filter;
  });

  const getStatusBadge = (status: Post["status"]) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusClasses = {
      PUBLISHED: "bg-green-100 text-green-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
    };
    return `${baseClasses} ${statusClasses[status]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
            <p className="text-gray-600 mt-1">
              Manage your blog posts and drafts
            </p>
          </div>
          <Link
            href="/posts/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Posts
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {posts.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Published
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {posts.filter((p) => p.status === "PUBLISHED").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Drafts
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {posts.filter((p) => p.status === "DRAFT").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {(["ALL", "PUBLISHED", "DRAFT"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === status
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {status === "ALL"
                    ? "All Posts"
                    : status.charAt(0) + status.slice(1).toLowerCase()}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {status === "ALL"
                      ? posts.length
                      : posts.filter((p) => p.status === status).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Posts List */}
          <div className="p-6">
            {postsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading posts...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {post.title}
                          </h3>
                          <span className={getStatusBadge(post.status)}>
                            {post.status}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{post.excerpt}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Avatar
                              src={post.author.avatar}
                              alt={post.author.name}
                              size={20}
                              fallbackText={post.author.name}
                              className="rounded-full"
                            />
                            <span>{post.author.name}</span>
                          </div>
                          <span>•</span>
                          <span>Created {formatDate(post.created_at)}</span>
                          {post.updated_at !== post.created_at && (
                            <>
                              <span>•</span>
                              <span>Updated {formatDate(post.updated_at)}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors text-sm"
                        >
                          Edit
                        </Link>
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/posts/${post.id}`}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors text-sm"
                          >
                            View
                          </Link>
                        )}
                        <button className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition-colors text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
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
                  No posts found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === "ALL"
                    ? "Get started by creating your first post."
                    : `No ${filter.toLowerCase()} posts found.`}
                </p>
                <div className="mt-6">
                  <Link
                    href="/posts/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create New Post
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
