import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const chartData = [
  { date: "Jan 01", value: 45000 },
  { date: "Jan 05", value: 48500 },
  { date: "Jan 10", value: 47000 },
  { date: "Jan 15", value: 52000 },
  { date: "Jan 20", value: 51000 },
  { date: "Jan 25", value: 56000 },
  { date: "Jan 30", value: 58420 },
];

const recentTransactions = [
  {
    id: "TRX-8291",
    date: "Jan 21, 2026",
    merchant: "Amazon Web Services",
    type: "Infrastructure",
    amount: -1240.50,
    status: "Completed",
  },
  {
    id: "TRX-8290",
    date: "Jan 20, 2026",
    merchant: "Stripe Payout",
    type: "Payout",
    amount: 12500.00,
    status: "Completed",
  },
  {
    id: "TRX-8289",
    date: "Jan 19, 2026",
    merchant: "Apple Inc.",
    type: "Hardware",
    amount: -2499.00,
    status: "Pending",
  },
  {
    id: "TRX-8288",
    date: "Jan 18, 2026",
    merchant: "Figma Subscription",
    type: "Software",
    amount: -45.00,
    status: "Completed",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Total Balance
            </span>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight font-mono">
              $58,420.00
            </span>
            <span className="text-[11px] font-medium text-green-500 flex items-center">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              +12.5%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Across 4 linked accounts
          </p>
        </div>

        <div className="rounded border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Daily Delta
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight font-mono">
              +$1,240.50
            </span>
            <span className="text-[11px] font-medium text-green-500 flex items-center">
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
              +2.1%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Since yesterday 00:00 UTC
          </p>
        </div>

        <div className="rounded border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Monthly Delta
            </span>
            <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight font-mono">
              -$4,120.00
            </span>
            <span className="text-[11px] font-medium text-red-500 flex items-center">
              <ArrowDownLeft className="mr-0.5 h-3 w-3" />
              -0.8%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Projected vs last month
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4 rounded border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-tight">Balance History</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 text-[11px] px-2">
                1W
              </Button>
              <Button variant="secondary" size="sm" className="h-7 text-[11px] px-2">
                1M
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-[11px] px-2">
                1Y
              </Button>
            </div>
          </div>
          <div className="h-[280px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    fontSize: "12px",
                    borderRadius: "4px"
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 rounded border border-border bg-card shadow-sm">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold tracking-tight">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border overflow-auto h-[280px]">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded",
                    tx.amount > 0 ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                  )}>
                    {tx.amount > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium leading-tight">{tx.merchant}</span>
                    <span className="text-[11px] text-muted-foreground">{tx.type} • {tx.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={cn(
                    "text-[13px] font-semibold font-mono",
                    tx.amount > 0 ? "text-green-500" : "text-foreground"
                  )}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </span>
                  <Badge variant={tx.status === "Pending" ? "outline" : "secondary"} className="h-4 text-[9px] px-1 py-0 uppercase">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground" onClick={() => console.log('View all transactions')}>
              View all transactions
              <MoreHorizontal className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}