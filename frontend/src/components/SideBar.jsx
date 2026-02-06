import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/wallet", label: "Accounts", icon: Wallet },
  { to: "/transactions", label: "Ledger", icon: ArrowLeftRight },
];

export function SideBar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-border bg-[#fcfcfc]">
      {/* Logo */}
      <div className="flex h-14 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <Shield className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-[14px] font-semibold tracking-tight">Vault</span>
        </div>
      </div>

      {/* Nav */}
      <div className="px-3 py-4">
        <div className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Main
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          System
        </div>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded px-3 py-1.5 text-[13px] font-medium transition-colors",
              isActive
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )
          }
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-border p-3">
        <div className="flex items-center gap-3 rounded px-3 py-2 hover:bg-secondary/50">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[11px] font-bold">
            JD
          </div>
          <div>
            <p className="text-[12px] font-medium leading-none">John Doe</p>
            <p className="text-[11px] text-muted-foreground">Admin</p>
          </div>
        </div>

        <NavLink
          to="/login"
          className="mt-1 flex items-center gap-3 rounded px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </NavLink>
      </div>
    </aside>
  );
}
