// API utility functions
// This is a placeholder file for API-related functionality

// Base API URL (to be configured based on environment)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Authentication API functions
export const authAPI = {
  login: (credentials) => 
    apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  register: (userData) => 
    apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
}

// User API functions
export const userAPI = {
  getAllUsers: (token) => 
    apiRequest('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }),
}

// Farmer API functions
export const farmerAPI = {
  addFarmer: (farmerData) => 
    apiRequest('/api/farmers/add', {
      method: 'POST',
      body: JSON.stringify(farmerData),
    }),
  
  getAllFarmers: () => 
    apiRequest('/api/farmers/all'),
  
  getFarmerById: (id) => 
    apiRequest(`/api/farmers/${id}`),
  
  updateFarmer: (id, farmerData) => 
    apiRequest(`/api/farmers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(farmerData),
    }),
  
  deleteFarmer: (id) => 
    apiRequest(`/api/farmers/${id}`, {
      method: 'DELETE',
    }),
}

// Cultivation API functions
export const cultivationAPI = {
  addCultivation: (farmerId, cultivationData) => 
    apiRequest(`/api/cultivations/add/${farmerId}`, {
      method: 'POST',
      body: JSON.stringify(cultivationData),
    }),
  
  getCultivationsByFarmer: (farmerId) => 
    apiRequest(`/api/cultivations/${farmerId}`),
  
  getAllCultivations: () => 
    apiRequest('/api/cultivations/get/all'),
}

// Alert API for Twilio SMS
export const alertAPI = {
  sendAlert: async (alertData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alertData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Alert API error:', error);
      throw error;
    }
  },

  getAlertHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Alert history API error:', error);
      throw error;
    }
  }
};

// Example usage:
// import { authAPI, userAPI, farmerAPI, alertAPI } from './api/api.js'
// 
// try {
//   const response = await authAPI.login({ email, password })
//   console.log('Login successful:', response)
// } catch (error) {
//   console.error('Login failed:', error)
// }