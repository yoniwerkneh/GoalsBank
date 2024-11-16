import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

const api = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Login failed');
  }
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Registration failed');
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to get profile');
  }
};

export const updateProfile = async (data: Partial<RegisterData>) => {
  try {
    const response = await api.put('/users/profile', data);
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to update profile');
  }
};

export default api;