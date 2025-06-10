import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

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
    console.log(response.data);
    const { token } = response.data;
    const decoded = jwtDecode(token);
    const user = { id: decoded.userId };
    
    localStorage.setItem('authToken', token);    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;        

    return response;    
  } catch (error) {
    handleLoginError(error);
    return { success: false };
  }
};
