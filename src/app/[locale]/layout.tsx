import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import dynamic from 'next/dynamic';
import { Inter } from "next/font/google";
const Providers = dynamic(() => import('@/components/providers'), { ssr: false })

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn("transition-colors", inter.className)}>
        <Providers locale={locale} messages={messages}>
          <Header />
          <main className="container pb-2 pt-2 md:pt-8 md:pb-8 min-h-screen">
            {children}
          </main>
          <footer className="container border-t border-border pt-8 pb-8 flex flex-col">
            <h1 className="text-xs font-bold tracking-tight scroll-m-20 mb-4">All rights reserved. Morten Renner 2024 ©</h1>
            <Link href="/privacy" className="text-xs font-normal tracking-tight">Privacy Policy</Link>
            <Link href="/impressum" className="text-xs font-normal tracking-tight">Impressum - Legal Notice</Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
