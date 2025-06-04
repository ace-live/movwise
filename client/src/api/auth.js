import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // or your deployed server URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network Error' };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network Error' };
  }
};
