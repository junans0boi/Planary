// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false   // 쿠키 / BasicAuth 제거
});

// 필요 없다면 인터셉터도 전부 삭제
export default instance;