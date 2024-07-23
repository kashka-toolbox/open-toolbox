'use client';

import { createContext, useEffect, useState } from "react";

// Export the Context (refresh and access token)
export const AuthContext = createContext<{
  refreshToken: string,
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>,
  accessToken: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  isSignedIn: boolean,
  logout: () => boolean,
  signIn: (username: string, password: string) => void, // TODO return error or boolean or something like that?
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
    // TODO implement logout
    throw new Error('Not implemented');
  }

  const signIn = (username: string, password: string) => {
    setRefreshToken('refreshToken');
    setAccessToken('accessToken');
    // TODO implement signIn
    //throw new Error('Not implemented');
  }

  useEffect(() => {
    localStorage.setItem('refreshToken', refreshToken);
  }, [refreshToken]);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  useEffect(() => {
    setIsSignedIn(accessToken.length > 0 && refreshToken.length > 0);
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{refreshToken, setRefreshToken, accessToken, setAccessToken, isSignedIn, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}