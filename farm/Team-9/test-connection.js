const fetch = require('node-fetch');

async function testConnection() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing backend connection...\n');
  
  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const response = await fetch(`${baseUrl}/users`);
    console.log('✅ Server is running');
    
    // Test 2: Test user registration
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        role: 'user',
        phoneNumber: '1234567890'
      })
    });
    
    if (registerResponse.ok) {
      console.log('✅ User registration working');
    } else {
      console.log('❌ User registration failed');
    }
    
    // Test 3: Test farmer API
    console.log('\n3. Testing farmer API...');
    const farmerResponse = await fetch(`${baseUrl}/api/farmers/all`);
    
    if (farmerResponse.ok) {
      console.log('✅ Farmer API working');
    } else {
      console.log('❌ Farmer API failed');
    }
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   - MongoDB is running');
    console.log('   - Backend server is started (npm run backend)');
    console.log('   - Port 3000 is available');
  }
}

testConnection(); 