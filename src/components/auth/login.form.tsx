"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "../auth-provider";
import { Sign } from "crypto";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().max(200),
});

export default function LoginForm() {
  const { isSignedIn, signIn, logout } = useContext(AuthContext) ?? {};
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signIn!(values.username, values.password).then((result) => {
      if (result === true) {
        console.log("Signed in");
        form.clearErrors();
      } else {
        console.error("Failed to sign in. Reason:", result);

        let error = "An unknown error occurred";

        if (result === "Unauthorized") {
          error = "Invalid username or password";
        }

        form.setError("password", {
          type: "manual",
          message: error,
        });
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input autoComplete="username" placeholder="Nico" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input autoComplete="current-password" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="mt-2" disabled={loading}>Submit</Button>
      <Button type="button" className="mt-2" variant={"link"} onClick={() => {}}>Forgot password</Button>
    </form>
  </Form>
  )
}