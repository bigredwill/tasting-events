import { Form, useActionData, json, redirect, Link } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pb from '@/lib/pocketbase';

export const description =
  "A registration page with two columns. The first column has the registration form with email, password, and password confirmation. There's a link to login if you already have an account. The second column has a cover image.";

export let clientAction: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email") || "";
  let password = formData.get("password") || "";
  let passwordConfirm = formData.get("passwordConfirm") || "";

  if (password !== passwordConfirm) {
    return json({ error: "Passwords do not match" }, { status: 400 });
  }

  try {
    await pb.collection("users").create({ email, password, passwordConfirm });
    return redirect("/dashboard");
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
};

export default function Register() {
  let actionData = useActionData();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setpasswordConfirm] = useState("");

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create a new account
            </p>
          </div>
          <div className="grid gap-4">
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                  required
                />
              </div>
              {actionData?.error && <p className="error">{actionData.error}</p>}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://placecats.com/1000/1000"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}