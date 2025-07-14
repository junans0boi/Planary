// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  auth: {
    username: 'test@planary.com',
    password: 'test1234'
  }
});

export default instance;