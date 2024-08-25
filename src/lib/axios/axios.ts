"use client"

import axios from 'axios';

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
/*
// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);*/

// Add a response interceptor
/*api.interceptors.response.use(
  response => response,
  error => {
    // Handle the response error1
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);*/

export default backend;