"use client";

import { useState } from "react";
import axios from "axios";

export default function TestApiPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult("");

    try {
      // Test backend connection using health endpoint
      const response = await axios.get("http://localhost:3000/api/v1/health");
      setResult(
        `✅ Backend connected successfully! Response: ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );
    } catch (error: any) {
      if (error.response) {
        setResult(
          `❌ Backend responded with error: ${
            error.response.status
          } - ${JSON.stringify(error.response.data, null, 2)}`
        );
      } else if (error.request) {
        setResult(
          `❌ No response from backend. Is it running on http://localhost:3000?`
        );
      } else {
        setResult(`❌ Request failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setResult("");

    try {
      const testData = {
        name: "Test User",
        email: `testuser${Date.now()}@example.com`,
        password: "password123",
        bio: "Test bio",
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        testData
      );
      setResult(
        `✅ Registration test successful! Response: ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );
    } catch (error: any) {
      if (error.response) {
        setResult(
          `❌ Registration failed: ${error.response.status} - ${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else {
        setResult(`❌ Registration request failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult("");

    try {
      // Try to login with default admin user
      const loginData = {
        email: "admin@blog.com",
        password: "admin123",
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        loginData
      );
      setResult(
        `✅ Login test successful! Response: ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );
    } catch (error: any) {
      if (error.response) {
        setResult(
          `❌ Login failed: ${error.response.status} - ${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else {
        setResult(`❌ Login request failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          API Connection Test
        </h1>

        <div className="space-y-4 mb-6">
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 mr-4"
          >
            {loading ? "Testing..." : "Test Backend Connection"}
          </button>

          <button
            onClick={testRegister}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 mr-4"
          >
            {loading ? "Testing..." : "Test Registration"}
          </button>

          <button
            onClick={testLogin}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Login (Default Admin)"}
          </button>
        </div>

        {result && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-900 mb-2">Test Result:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <h3 className="font-semibold text-yellow-800 mb-2">
            📋 Debug Information:
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Frontend URL: http://localhost:3001</li>
            <li>• Backend URL: http://localhost:3000</li>
            <li>
              • API Base URL:{" "}
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}
            </li>
            <li>• Environment: {process.env.NODE_ENV || "development"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
