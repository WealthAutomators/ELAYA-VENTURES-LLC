"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
  };

  return (
    <div className="min-h-[70vh] bg-muted/40">
      {showError && (
        <div className="border-b border-red-200 bg-red-50">
          <Container className="py-3">
            <div className="flex items-center gap-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>
                <span className="font-semibold">ERROR:</span> Incorrect username or password.
              </p>
            </div>
          </Container>
        </div>
      )}

      <Container className="py-12 md:py-16">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Log in
        </h1>

        <div className="mx-auto mt-10 max-w-lg">
          <div className="border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-medium text-foreground">Log in to your account</h2>

            <form onSubmit={handleLogin} className="mt-6 space-y-5">
              <div>
                <Label htmlFor="login-email">Username or Email Address</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="login-password">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember-me" className="cursor-pointer font-normal">
                    Remember me
                  </Label>
                </div>
                <Link href="/contact" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Log in
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
