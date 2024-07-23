'use client'
import { ThemeProvider } from "@/components/theme-provider";
import { createContext, useState } from "react";
import AuthProvider from "./auth-provider";

type User = {
  firstName: string
  lastName: string,
  email: string,
  uuids: string,
}

const UserContext = createContext<User | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}