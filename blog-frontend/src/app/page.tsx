import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BlogApp
        </h1>
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
      </div>
    </Layout>
  );
}
