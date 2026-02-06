import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NavBar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <div>
        <h1 className="text-sm font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-8 w-48 pl-8 text-xs"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </Button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
          JD
        </div>
      </div>
    </header>
  );
}
