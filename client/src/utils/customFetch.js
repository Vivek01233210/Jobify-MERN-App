import axios from 'axios';

export const customFetch = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  // baseURL: '/api/v1',
  withCredentials: true,
});