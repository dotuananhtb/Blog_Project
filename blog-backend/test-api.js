#!/usr/bin/env node

const axios = require('axios');

const API_BASE = 'http://localhost:3000';

async function testAPI() {
  console.log('🚀 Testing Blog API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get(`${API_BASE}/api/v1/health`);
    console.log('✅ Health check:', health.data);
    console.log('');

    // Test user registration
    console.log('2. Testing user registration...');
    const registerData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      bio: 'I am a test user for the blog API',
    };

    const registerResponse = await axios.post(
      `${API_BASE}/api/v1/auth/register`,
      registerData,
    );
    console.log('✅ User registered:', {
      user: registerResponse.data.user.name,
      email: registerResponse.data.user.email,
      hasToken: !!registerResponse.data.access_token,
    });

    const token = registerResponse.data.access_token;
    console.log('');

    // Test login
    console.log('3. Testing user login...');
    const loginResponse = await axios.post(`${API_BASE}/api/v1/auth/login`, {
      email: registerData.email,
      password: registerData.password,
    });
    console.log('✅ User logged in:', {
      user: loginResponse.data.user.name,
      hasToken: !!loginResponse.data.access_token,
    });
    console.log('');

    // Test protected route - get profile
    console.log('4. Testing get profile (protected route)...');
    const profileResponse = await axios.get(
      `${API_BASE}/api/v1/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('✅ Profile retrieved:', {
      name: profileResponse.data.name,
      email: profileResponse.data.email,
      role: profileResponse.data.role,
    });
    console.log('');

    // Test profile update
    console.log('5. Testing profile update...');
    const updateResponse = await axios.put(
      `${API_BASE}/api/v1/users/profile`,
      {
        name: 'Updated Test User',
        bio: 'Updated bio - I am still a test user!',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('✅ Profile updated:', {
      name: updateResponse.data.name,
      bio: updateResponse.data.bio,
    });
    console.log('');

    // Test posts endpoint
    console.log('6. Testing posts endpoints...');
    const postsResponse = await axios.get(`${API_BASE}/api/v1/posts`);
    console.log('✅ Public posts:', postsResponse.data);

    const myPostsResponse = await axios.get(
      `${API_BASE}/api/v1/posts/my-posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('✅ My posts (protected):', myPostsResponse.data);
    console.log('');

    // Test logout
    console.log('7. Testing logout...');
    const logoutResponse = await axios.post(
      `${API_BASE}/api/v1/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('✅ Logout successful:', logoutResponse.data);

    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Setup MySQL database');
    console.log('2. Update .env with your database credentials');
    console.log('3. Run: npm run start:dev');
    console.log('4. Import the Postman collection for more testing');
    console.log('5. Setup the frontend Next.js project');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.log('\n🔧 Make sure:');
    console.log('- The server is running (npm run start:dev)');
    console.log('- MySQL database is setup and running');
    console.log('- Environment variables are configured');
  }
}

if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
