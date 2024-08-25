"use client"

import axios from 'axios';

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// interceptor to attach the token to the request
backend.interceptors.request.use(
  async (config) => {
    const token = await getOrRequestAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('No access token found');
    }
    return config;
  },
  (error) => {
    return error;
  }
);

// interceptor to retry the request if the token is invalid
backend.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // check is this request was already retried
      if (error.config.__isRetryRequest) {
        console.error('Unauthorized request retry failed', error);
        return Promise.reject(new Error(error));
      }

      localStorage.removeItem('accessToken');
      error.config.__isRetryRequest = true; // mark the request as retried,

      return backend.request(error.config); // retry the request
    } else {
      return error;
    }
  }
);
export default backend;



/**
 * Requests an access token using a refresh token.
 *
 * @param refreshToken - The refresh token used to request a new access token.
 * @returns A Promise that resolves to an access token.
 */
function requestAccessToken(refreshToken: string): Promise<string> {
  return axios.get(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/auth/refresh', {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${refreshToken}` }
  }).then((response) => {
    if (typeof response.data.access_token === 'string') {
      return response.data.access_token;
    }

    console.error('Invalid response for refresh', response);
    throw new Error("The response was invalid.");
  }
  ).catch((error) => {
    console.error(error);
    return error?.response?.statusText ?? error?.code as string ?? "UNKNOWN_ERROR";
  });
}

/**
 * Gets the access token from the local storage or requests a new one using the refresh token if there is none saved.
 *
 * @returns A Promise that resolves to an access token.
 */
async function getOrRequestAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return token;
  } else {
    let accessToken = await requestAccessToken(localStorage.getItem('refreshToken') ?? '');
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }
}
