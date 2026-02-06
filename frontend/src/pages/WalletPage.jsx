import React, { useState } from 'react';
import { 
  Wallet, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronRight,
  CreditCard,
  Building2,
  Globe,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState("form");

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Funds Management</h1>
        <p className="text-[13px] text-muted-foreground">Manage your liquid assets and transfers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <Tabs defaultValue="transfer" className="w-full">
            <div className="flex items-center justify-between border-b border-border mb-4">
              <TabsList className="h-9 bg-transparent p-0 gap-4">
                <TabsTrigger 
                  value="transfer" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-9 px-0 text-[13px]"
                >
                  Internal Transfer
                </TabsTrigger>
                <TabsTrigger 
                  value="send" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-9 px-0 text-[13px]"
                >
                  Send Money
                </TabsTrigger>
                <TabsTrigger 
                  value="topup" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none h-9 px-0 text-[13px]"
                >
                  Top Up
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="transfer" className="mt-0 space-y-6">
              {step === "form" && (
                <div className="space-y-4 rounded border border-border bg-card p-6 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Source Account</Label>
                      <Select defaultValue="main">
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">
                            <div className="flex items-center gap-2">
                              <Wallet className="h-4 w-4 text-muted-foreground" />
                              <span>Main Operational (USD)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="savings">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                              <span>Reserve Account (USD)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[11px] text-muted-foreground">Available: $42,120.50</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Destination Account</Label>
                      <Select defaultValue="savings">
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Operational (USD)</SelectItem>
                          <SelectItem value="savings">Reserve Account (USD)</SelectItem>
                          <SelectItem value="euro">European Vault (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-7 h-12 text-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="rounded bg-muted/50 p-4 border border-border">
                    <div className="flex gap-3">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[12px] font-medium">Risk Advisory</p>
                        <p className="text-[11px] text-muted-foreground leading-normal">
                          Internal transfers are processed instantly. Ensure the destination account is authorized for your department&apos;s cost center.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-10" onClick={() => setStep("confirm")}>
                    Review Transfer
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === "confirm" && (
                <div className="space-y-6 rounded border border-border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <h3 className="text-sm font-semibold">Transfer Review</h3>
                      <Badge variant="outline" className="text-[10px] font-mono tracking-tighter">REF: {Math.random().toString(36).substring(7).toUpperCase()}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-4 py-2">
                      <div className="text-[12px] text-muted-foreground">From</div>
                      <div className="text-[12px] font-medium text-right">Main Operational (USD)</div>
                      
                      <div className="text-[12px] text-muted-foreground">To</div>
                      <div className="text-[12px] font-medium text-right">Reserve Account (USD)</div>
                      
                      <div className="text-[12px] text-muted-foreground">Amount</div>
                      <div className="text-[14px] font-bold font-mono text-right">$5,000.00</div>
                      
                      <div className="text-[12px] text-muted-foreground">Fee</div>
                      <div className="text-[12px] font-medium text-right">$0.00</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>Back</Button>
                    <Button className="flex-[2]" onClick={handleProcess} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : "Confirm Transfer"}
                    </Button>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center space-y-4 rounded border border-border bg-card p-12 shadow-sm animate-in zoom-in-95 duration-500">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold tracking-tight">Transfer Successful</h3>
                    <p className="text-[13px] text-muted-foreground">Your funds have been moved between accounts.</p>
                  </div>
                  <Button variant="outline" className="h-9 px-8" onClick={() => setStep("form")}>
                    Done
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="send" className="mt-0">
              <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded">
                <Globe className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-[13px] text-muted-foreground">External transfers module not active in demo.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="topup" className="mt-0">
              <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded">
                <CreditCard className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-[13px] text-muted-foreground">Top-up module not active in demo.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="rounded border border-border bg-card shadow-sm">
            <div className="p-4 border-b border-border">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">Your Accounts</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium">Chase Business</span>
                    <span className="text-[11px] text-muted-foreground">**** 8291</span>
                  </div>
                </div>
                <div className="text-[13px] font-bold font-mono">$42,120.50</div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium">Revolut Business</span>
                    <span className="text-[11px] text-muted-foreground">**** 1102</span>
                  </div>
                </div>
                <div className="text-[13px] font-bold font-mono">$16,300.00</div>
              </div>
            </div>
            <div className="p-3 border-t border-border">
              <Button variant="ghost" className="w-full h-8 text-[11px] text-muted-foreground hover:text-foreground">
                <PlusCircle className="mr-2 h-3 w-3" />
                Link new account
              </Button>
            </div>
          </div>

          <div className="rounded border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-[12px] font-semibold uppercase tracking-wider">Security Features</span>
            </div>
            <ul className="space-y-2">
              <li className="text-[11px] text-muted-foreground flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-border" />
                Dual-factor approval for transfers &gt; $10k
              </li>
              <li className="text-[11px] text-muted-foreground flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-border" />
                End-to-end ledger encryption
              </li>
              <li className="text-[11px] text-muted-foreground flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-border" />
                PCI DSS Level 1 Certified
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}