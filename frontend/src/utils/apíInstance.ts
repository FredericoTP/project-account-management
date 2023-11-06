import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.API_PORT || 3001}`,
  timeout: 10000,
});

export default api;
