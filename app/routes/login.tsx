import { Form, useActionData, json, redirect, Link } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pb from '@/lib/pocketbase';

export let loader: LoaderFunction = async ({ request }) => {
  // Add any loader logic here if needed
  return json({});
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email") || '';
  let password = formData.get("password") || '';

  const authData = await pb.collection('users').authWithPassword(email, password);

  if (authData.token) {
    return redirect("/dashboard");
  }

  return json({ error: "Invalid credentials" }, { status: 400 });
};

export default function LoginPage() {
  let actionData = useActionData();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div className="login-container p-4 pt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {actionData?.error && <p className="error">{actionData.error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}