'use client';

import api from "@/lib/axios/axios";
import { createContext, useContext, useEffect, useState } from "react";

// Export the Context (refresh and access token)
export const AuthContext = createContext<{
  refreshToken: string,
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>,
  accessToken: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  isSignedIn: boolean,
  logout: () => boolean,
  signIn: (username: string, password: string) => Promise<string | boolean>,
} | undefined>(undefined);


/**
 * AuthProvider component
 *
 * The AuthProvider component is used to provide the refresh and access token to the application.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *  <App />
 * </AuthProvider>
 * ```
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [refreshToken, setRefreshToken] = useState<string>(localStorage.getItem('refreshToken') ?? '');
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('accessToken') ?? '');
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const logout = () => {
    setRefreshToken('');
    setAccessToken('');
    // TODO implement logout / notify server
    return true;
  }

  const signIn = async (username: string, password: string) => {
    return await api.post('/auth/login', { email: username, password }).then((response) => {
      if(typeof response.data.refresh_token === 'string') {
        setAccessToken('');
        setRefreshToken(response.data.refresh_token);
        return true;
      } else {
        console.error('Invalid response for login', response.data);
        return "BAD_RESPONSE";
      }
    }).catch((error) => {
      console.error(error);
      return error?.response?.statusText as string ?? "UNKNOWN_ERROR";
    });
  }

  useEffect(() => {
    localStorage.setItem('refreshToken', refreshToken);
  }, [refreshToken]);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  useEffect(() => {
    setIsSignedIn(refreshToken?.length > 0);
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{refreshToken, setRefreshToken, accessToken, setAccessToken, isSignedIn, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}