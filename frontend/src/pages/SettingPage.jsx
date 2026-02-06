import { useState } from "react";
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Building2, 
  Key,
  ChevronRight,
  Check,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "api", label: "API Keys", icon: Key },
];

const Label = ({ children, className }) => (
  <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}>
    {children}
  </label>
);

const Switch = ({ defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-input"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
};

export default function SettingPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="min-h-screen w-full p-8 bg-background">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
          <p className="text-[13px] text-muted-foreground">Manage your account preferences and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded px-3 py-2 text-[13px] font-medium transition-colors text-left",
                    activeSection === section.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-9 space-y-6">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">First Name</Label>
                      <Input defaultValue="John" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Last Name</Label>
                      <Input defaultValue="Doe" className="h-9" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Email Address</Label>
                      <Input defaultValue="john.doe@company.com" className="h-9" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                      <Input defaultValue="+1 (555) 123-4567" className="h-9" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button size="sm" className="h-8 text-[12px]">Save Changes</Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6">
                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-success/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium">Authenticator App</p>
                        <p className="text-[11px] text-muted-foreground">Google Authenticator enabled</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-success/10 text-success border-none">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                        <Key className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium">Hardware Security Key</p>
                        <p className="text-[11px] text-muted-foreground">YubiKey or similar device</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-[11px]">Setup</Button>
                  </div>
                </div>

                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Current Password</Label>
                      <Input type="password" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">New Password</Label>
                      <Input type="password" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Confirm New Password</Label>
                      <Input type="password" className="h-9" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button size="sm" className="h-8 text-[12px]">Update Password</Button>
                  </div>
                </div>

                <div className="rounded border border-destructive/20 bg-destructive/5 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
                      <p className="text-[12px] text-muted-foreground mt-1">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" size="sm" className="h-8 text-[12px] mt-4">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Transaction Alerts", description: "Receive alerts for all account activity" },
                      { title: "Daily Summary", description: "Daily digest of your account balance" },
                      { title: "Security Alerts", description: "Important security notifications" },
                      { title: "Marketing Updates", description: "News and product updates" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-[13px] font-medium">{item.title}</p>
                          <p className="text-[11px] text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked={i < 3} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-6">
                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Current Plan</h3>
                    <Badge variant="secondary" className="text-[10px]">PRO</Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-mono-tabular">$49</span>
                    <span className="text-[13px] text-muted-foreground">/month</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-2">Your next billing date is February 1, 2026</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-[12px]">Change Plan</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[12px] text-muted-foreground">Cancel Subscription</Button>
                  </div>
                </div>

                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-12 rounded bg-muted flex items-center justify-center text-[10px] font-bold">VISA</div>
                      <div>
                        <p className="text-[13px] font-medium">Visa ending in 4242</p>
                        <p className="text-[11px] text-muted-foreground">Expires 12/2028</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-[11px]">Edit</Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "organization" && (
              <div className="space-y-6">
                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">Organization Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Company Name</Label>
                      <Input defaultValue="Acme Corporation" className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Tax ID</Label>
                      <Input defaultValue="US-123456789" className="h-9" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button size="sm" className="h-8 text-[12px]">Save Changes</Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "api" && (
              <div className="space-y-6">
                <div className="rounded border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4">API Keys</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded bg-muted/50 border border-border">
                      <div>
                        <p className="text-[12px] font-medium font-mono">sk_live_•••••••••••••••••4f2a</p>
                        <p className="text-[11px] text-muted-foreground">Created Jan 15, 2026</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-[11px] text-destructive hover:text-destructive">Revoke</Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-[12px] mt-4">
                    <Key className="mr-2 h-3 w-3" />
                    Generate New Key
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}