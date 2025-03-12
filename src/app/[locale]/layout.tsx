import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import dynamic from 'next/dynamic';
import localFont from 'next/font/local'
const Providers = dynamic(() => import('@/components/providers'))

const hostGrotesk = localFont({
  src: [
    {
      path: '../../../public/fonts/HostGrotesk/HostGrotesk-Italic-VariableFont_wght.ttf',
      weight: '300 700',
    },
  ],
  variable: '--font-HostGroteskItalic',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
  }>
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  const messages = await getMessages();

  return (
    <html lang={locale} className={hostGrotesk.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>

      <body className={cn("transition-colors")}>
        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <footer className="container border-t border-border pt-8 pb-8 flex flex-col">
            <h1 className="text-xs font-bold tracking-tight scroll-m-20 mb-4">All rights reserved. Morten Renner 2024 ©</h1>
            <Link href="/privacy" className="text-xs font-normal tracking-tight">Privacy Policy</Link>
            <Link href="/imprint" className="text-xs font-normal tracking-tight">Impressum - Legal Notice</Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
