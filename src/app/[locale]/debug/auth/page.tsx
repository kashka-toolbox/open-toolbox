"use client"

import { AuthContext } from "@/components/auth-provider";
import WithAuthOnly from "@/components/auth/WithAuthOnly";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/Section";
import { StatusIndicator } from "@/components/ui/status-indicator";
import backend from "@/lib/axios/axios";
import { useContext, useEffect, useState } from "react";

/**
 * Performs a authentication test by making a GET request.
 */
function testAuth(): Promise<string> {
  return backend.get("/auth/check").then((response) => {
    if (typeof response.data === 'string') {
      return response.data;
    }

    console.error('Invalid response for check', response);
    return "200 OK but invalid response format";
  }).catch((error) => {
    console.error(error);
    return (error.message as string) ?? "Unknown -> See console";
  });
}

export default function Page() {
  const { isSignedIn, accessToken } = useContext(AuthContext) ?? {};
  const [hasAccessToken, setHasAccessToken] = useState<boolean>(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);

  useEffect(() => {
    setHasAccessToken((accessToken?.length ?? 0) > 0);
  }, [accessToken]);

  return (
    <>
      <Section className="flex flex-col gap-1">
        <h1>Auth Test</h1>
        <StatusIndicator status={isSignedIn ? "checked" : "unchecked"}>
          is signed in
        </StatusIndicator>
        <StatusIndicator status={hasAccessToken ? "checked" : "unchecked"}>
          has access token {hasAccessToken ? `(${accessToken?.substring(accessToken.length / 2 - 3, accessToken.length / 2 + 3)})` : ""}
        </StatusIndicator>
        <br />
        <Card className="p-4 w-max">
          <WithAuthOnly alternative={
            <span>Not signed in</span>
          }>
            <span>Signed in</span>
          </WithAuthOnly>
        </Card>
      </Section>
      <Section className="mt-2">
        <Button
          onClick={
            () => {
              setTestResponse(null);
              testAuth().then((response) => {
                setTestResponse(response);
              })
            }
          }
          variant={"default"}>Test Auth</Button>
        <pre>{testResponse}</pre>
      </Section>
    </>
  );
}

