'use client'
import { ThemeProvider } from "@/components/theme-provider";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { createContext, useState } from "react";
import AuthProvider from "./auth-provider";

type User = {
  firstName: string
  lastName: string,
  email: string,
  uuids: string,
}

const UserContext = createContext<User | null>(null);

export default function Providers({ children, locale, messages }: { children: React.ReactNode, locale: string, messages: AbstractIntlMessages }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      defaultTranslationValues={{
        li: (chunks) => <li>{chunks}</li>
      }}>
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
    </NextIntlClientProvider>
  )
}