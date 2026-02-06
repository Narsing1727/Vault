import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    console.log('Create account clicked');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-[420px] space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Create your Vault account</h1>
          <p className="text-[13px] text-muted-foreground text-center">
            Join thousands of professionals managing their assets with bank-grade security.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="first-name">First name</Label>
              <Input 
                id="first-name" 
                placeholder="John" 
                className="h-9"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name">Last name</Label>
              <Input 
                id="last-name" 
                placeholder="Doe" 
                className="h-9"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              placeholder="name@company.com"
              type="email"
              className="h-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              className="h-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="h-3 w-3 text-success" />
              <span className="text-[11px] text-muted-foreground">
                Minimum 12 characters with symbols
              </span>
            </div>
          </div>
          
          <Button className="w-full h-9" onClick={handleCreateAccount}>
            Create account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-[11px] text-muted-foreground text-center leading-normal">
            By clicking &quot;Create account&quot;, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </a>.
          </p>
        </div>

        <p className="text-center text-[13px] text-muted-foreground">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-foreground hover:underline underline-offset-4"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}