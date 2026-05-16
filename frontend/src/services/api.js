import axios from 'axios';

const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const API_BASE_URL = process.env.REACT_APP_API_URL || `http://${host}:5000/api`;

const API = axios.create({ baseURL: API_BASE_URL });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('fleetToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
