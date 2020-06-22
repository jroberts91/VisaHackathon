import axios from 'axios';

export const baseUrl = `http://localhost:3001/`

export default axios.create({
  baseURL: baseUrl,
  withCredentials: true
});