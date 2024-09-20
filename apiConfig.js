// apiConfig.js
 // Replace with your API base URL
 import { API_BASE } from '@env';

export const endpoints = {
  login: `${API_BASE}/login`,
  register: `${API_BASE}/createAccount`,
  logout: `${API_BASE}/logout`,
  // base_url: `${API_BASE_URL}`
};
