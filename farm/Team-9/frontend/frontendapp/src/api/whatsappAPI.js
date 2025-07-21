// WhatsApp API service for sending alerts
// This file handles WhatsApp Business API integration

const WHATSAPP_API_URL = import.meta.env.VITE_WHATSAPP_API_URL || 'https://api.whatsapp.com/v1';
const WHATSAPP_TOKEN = import.meta.env.VITE_WHATSAPP_TOKEN || 'your_whatsapp_token';

// Generic WhatsApp API request function
async function whatsappRequest(endpoint, options = {}) {
  const url = `${WHATSAPP_API_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `WhatsApp API error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('WhatsApp API request failed:', error);
    throw error;
  }
}

// Send WhatsApp message
export const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    const response = await whatsappRequest('/messages', {
      method: 'POST',
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message }
      }),
    });
    
    return response;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    throw error;
  }
};

// Send bulk WhatsApp messages
export const sendBulkWhatsAppMessages = async (phoneNumbers, message) => {
  try {
    const promises = phoneNumbers.map(phoneNumber => 
      sendWhatsAppMessage(phoneNumber, message)
    );
    
    const results = await Promise.allSettled(promises);
    return results;
  } catch (error) {
    console.error('Failed to send bulk WhatsApp messages:', error);
    throw error;
  }
};

// Send template message (for approved templates)
export const sendTemplateMessage = async (phoneNumber, templateName, languageCode = 'en', components = []) => {
  try {
    const response = await whatsappRequest('/messages', {
      method: 'POST',
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode
          },
          components: components
        }
      }),
    });
    
    return response;
  } catch (error) {
    console.error('Failed to send template message:', error);
    throw error;
  }
};

// Get message status
export const getMessageStatus = async (messageId) => {
  try {
    const response = await whatsappRequest(`/messages/${messageId}`);
    return response;
  } catch (error) {
    console.error('Failed to get message status:', error);
    throw error;
  }
};

// WhatsApp Business API utilities
export const whatsappUtils = {
  // Format phone number for WhatsApp API
  formatPhoneNumber: (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present (assuming India +91)
    if (cleaned.length === 10) {
      return `91${cleaned}`;
    }
    
    return cleaned;
  },

  // Validate phone number
  validatePhoneNumber: (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  },

  // Create alert message template
  createAlertMessage: (alertType, message, priority) => {
    const priorityEmoji = {
      low: '🟢',
      medium: '🟡', 
      high: '🟠',
      urgent: '🔴'
    };

    const typeEmoji = {
      weather: '🌤️',
      emergency: '🚨',
      maintenance: '🔧',
      general: '📢'
    };

    return `${typeEmoji[alertType] || '📢'} *CML Alert - ${alertType.toUpperCase()}*\n\n` +
           `${priorityEmoji[priority] || '🟡'} Priority: ${priority.toUpperCase()}\n\n` +
           `${message}\n\n` +
           `---\n` +
           `Sent by CML Livelihood Tracker\n` +
           `Time: ${new Date().toLocaleString('en-IN')}`;
  },

  // Get recipient phone numbers based on selection
  getRecipientNumbers: async (recipients, farmerAPI, token) => {
    const phoneNumbers = [];
    
    try {
      if (recipients.includes('all_farmers')) {
        // Fetch all farmer phone numbers from API
        const farmers = await farmerAPI.getAllFarmers(token);
        farmers.forEach(farmer => {
          if (farmer.farmerPhoneNumber) {
            phoneNumbers.push(whatsappUtils.formatPhoneNumber(farmer.farmerPhoneNumber));
          }
        });
      }
      
      if (recipients.includes('cml_staff')) {
        // Add CML staff numbers (you can fetch from user API)
        // For now, using placeholder numbers
        phoneNumbers.push('919876543210', '919876543211');
      }
      
      if (recipients.includes('admins')) {
        // Add admin numbers
        phoneNumbers.push('919876543212', '919876543213');
      }
      
      // Remove duplicates
      return [...new Set(phoneNumbers)];
    } catch (error) {
      console.error('Error getting recipient numbers:', error);
      return [];
    }
  }
};

// Example usage:
// import { sendWhatsAppMessage, sendBulkWhatsAppMessages, whatsappUtils } from './whatsappAPI.js'
// 
// try {
//   const message = whatsappUtils.createAlertMessage('weather', 'High temperature alert!', 'high');
//   await sendWhatsAppMessage('919876543210', message);
//   console.log('WhatsApp message sent successfully');
// } catch (error) {
//   console.error('Failed to send WhatsApp message:', error);
// } 