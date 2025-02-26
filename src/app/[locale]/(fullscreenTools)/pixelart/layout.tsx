"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getTranslationKeyByHref } from "@/lib/navigation";
import { usePathname } from "next/navigation";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const pageTitle = getTranslationKeyByHref(pathname);

  return (
    <main className="min-h-screen mx-auto max-w-screen-2xl pt-6">
      {children}
    </main>
  );
}
