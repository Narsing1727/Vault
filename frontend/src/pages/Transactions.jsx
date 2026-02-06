import { useState } from "react";
import { 
  Search, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: "TX-92018",
    date: "2026-01-21 14:20:01",
    description: "Amazon Web Services - Infrastructure",
    type: "DEBIT",
    amount: 1240.50,
    status: "COMPLETED",
    account: "Main Ops",
  },
  {
    id: "TX-92017",
    date: "2026-01-21 11:05:42",
    description: "Stripe Payout - Ref #S1920",
    type: "CREDIT",
    amount: 12500.00,
    status: "COMPLETED",
    account: "Main Ops",
  },
  {
    id: "TX-92016",
    date: "2026-01-20 09:15:22",
    description: "Apple Inc. - Hardware Purchase",
    type: "DEBIT",
    amount: 2499.00,
    status: "PENDING",
    account: "Main Ops",
  },
  {
    id: "TX-92015",
    date: "2026-01-20 08:30:11",
    description: "Figma Subscription - Team Plan",
    type: "DEBIT",
    amount: 45.00,
    status: "COMPLETED",
    account: "Main Ops",
  },
  {
    id: "TX-92014",
    date: "2026-01-19 16:45:55",
    description: "Internal Transfer to Reserve",
    type: "TRANSFER",
    amount: 5000.00,
    status: "COMPLETED",
    account: "Reserve",
  },
  {
    id: "TX-92013",
    date: "2026-01-19 12:10:05",
    description: "Google Cloud Platform",
    type: "DEBIT",
    amount: 890.20,
    status: "COMPLETED",
    account: "Main Ops",
  },
  {
    id: "TX-92012",
    date: "2026-01-18 10:22:31",
    description: "Client Payment - Acme Corp",
    type: "CREDIT",
    amount: 25000.00,
    status: "COMPLETED",
    account: "Main Ops",
  },
  {
    id: "TX-92011",
    date: "2026-01-18 09:05:14",
    description: "Slack Technologies - Pro",
    type: "DEBIT",
    amount: 120.00,
    status: "FAILED",
    account: "Main Ops",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "COMPLETED":
      return (
        <Badge variant="secondary" className="bg-success/10 text-success border-none text-[10px] font-semibold tracking-wider">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          COMPLETED
        </Badge>
      );
    case "PENDING":
      return (
        <Badge variant="secondary" className="bg-warning/10 text-warning border-none text-[10px] font-semibold tracking-wider">
          <Clock className="mr-1 h-3 w-3" />
          PENDING
        </Badge>
      );
    case "FAILED":
      return (
        <Badge variant="secondary" className="bg-destructive/10 text-destructive border-none text-[10px] font-semibold tracking-wider">
          <AlertCircle className="mr-1 h-3 w-3" />
          FAILED
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Transactions() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen w-full p-8 bg-background">
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Transaction Ledger</h1>
          <p className="text-[13px] text-muted-foreground">Comprehensive record of all financial activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[11px] font-medium">
            <Download className="mr-2 h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button size="sm" className="h-8 text-[11px] font-medium">
            <RefreshCcw className="mr-2 h-3.5 w-3.5" />
            Sync Bank
          </Button>
        </div>
      </div>

      <div className="rounded border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by ID, merchant, or reference..."
              className="h-8 pl-8 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[11px]">
              <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              Jan 1 - Jan 31
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-[11px]">
              <Filter className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[100px] text-[11px] uppercase tracking-wider font-semibold">TX ID</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold">Date & Time</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold">Description</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold">Account</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-semibold">Status</TableHead>
                <TableHead className="text-right text-[11px] uppercase tracking-wider font-semibold">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/20 transition-colors group h-16">
                  <TableCell className="text-[12px] font-mono text-muted-foreground py-4">{tx.id}</TableCell>
                  <TableCell className="text-[12px] whitespace-nowrap py-4">{tx.date}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold",
                        tx.type === "CREDIT" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {tx.type === "CREDIT" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
                      </div>
                      <span className="text-[13px] font-medium truncate max-w-[250px]">{tx.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[12px] text-muted-foreground py-4">{tx.account}</TableCell>
                  <TableCell className="py-4">{getStatusBadge(tx.status)}</TableCell>
                  <TableCell className={cn(
                    "text-right text-[13px] font-bold font-mono-tabular py-4",
                    tx.type === "CREDIT" ? "text-success" : "text-foreground"
                  )}>
                    {tx.type === "CREDIT" ? "+" : "-"}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-[12px]">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Download receipt</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Report issue</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-[12px] text-muted-foreground">
            Showing <span className="font-medium text-foreground">8</span> of <span className="font-medium text-foreground">1,240</span> transactions
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 text-[11px] bg-secondary border-strong">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 text-[11px]">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 text-[11px]">3</Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}