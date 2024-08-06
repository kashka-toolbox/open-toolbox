"use client"

import { AuthContext } from "@/components/auth-provider";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { useContext } from "react";

export default function Home() {
  const { isSignedIn } = useContext(AuthContext) ?? {};

  return (
    <section className="flex flex-col gap-4">
      <span className="flex flex-col gap-1">
        <h1>Auth Test</h1>
          <StatusIndicator status={isSignedIn ? "checked" : "unchecked"}>
            is signed in
          </StatusIndicator>
          <StatusIndicator status={(localStorage.getItem("accessToken")?.length ?? 0) > 0 ? "checked" : "unchecked"}>
            has access token
          </StatusIndicator>
      </span>
    </section>
  );
}

