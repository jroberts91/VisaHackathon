import axios from 'axios';

export const frontEndUrl = `http://localhost:3000/`

export const baseUrl = `http://localhost:3001/`;

export default axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
