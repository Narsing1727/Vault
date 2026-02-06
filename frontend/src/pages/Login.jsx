import React from "react";
import { Shield, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-[380px] space-y-8">

        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight">
            Sign in to Vault
          </h1>

          <p className="text-[13px] text-muted-foreground text-center">
            Enter your credentials to access your secure finance dashboard.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Input
              id="password"
              type="password"
              className="h-9"
            />
          </div>

          <Button className="w-full h-9">
            Sign in
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Security Section */}
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Security Verification
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            AES-256 Encrypted Connection
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[13px] text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-foreground hover:underline underline-offset-4"
          >
            Create an account
          </a>
        </p>

      </div>
    </div>
  );
}
