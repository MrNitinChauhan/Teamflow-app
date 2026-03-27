import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // always send the httpOnly cookie
});

export default API;