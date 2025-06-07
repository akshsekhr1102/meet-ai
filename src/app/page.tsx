"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          console.log("onSuccess");
          window.alert("Successfully created user");
        },
        onError: (error) => {
          console.error("Sign up error:", error);
          window.alert("Something went wrong");
        },
      }
    );
  };
  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    authClient.signIn.email(
      {
        email: loginEmail,
        password: loginPassword,
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          console.log("onSuccess");
          window.alert("Successfully logged in");
        },
        onError: (error) => {
          console.error("Login error:", error);
          window.alert("Something went wrong");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>You are logged in {session.user?.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-content-center">
      <div className="flex flex-col  gap-y-4 justify-center  p-4 min-w-96">
        <form onSubmit={onSubmit}>
          <Input
            placeholder="name"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Create User</Button>
        </form>
      </div>
      <div className="flex flex-col  gap-y-4 justify-center  p-4 min-w-96">
        <p>Login Form</p>
        <form onSubmit={onLogin}>
          <Input
            placeholder="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <Input
            placeholder="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
