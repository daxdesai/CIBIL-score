"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LineChart,
  FileText,
  CreditCard,
  Search,
  SlidersHorizontal,
  TrendingUp,
  User,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/providers/auth-provider";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/score-history", label: "Score History", icon: LineChart },
  { href: "/credit-report", label: "Credit Report", icon: FileText },
  { href: "/credit-accounts", label: "Accounts", icon: CreditCard },
  { href: "/credit-enquiries", label: "Enquiries", icon: Search },
  { href: "/score-factors", label: "Score Factors", icon: SlidersHorizontal },
  { href: "/improvement-plan", label: "Improvement Plan", icon: TrendingUp },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/help", label: "Help", icon: HelpCircle },
];

function NavLink({
  href,
  label,
  icon: Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-border bg-card px-4 py-6",
        className,
      )}
    >
      <Link href="/dashboard" className="mb-8 px-3 text-lg font-semibold tracking-tight">
        BankName
      </Link>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Credit dashboard">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <Button
        variant="ghost"
        className="mt-4 justify-start gap-3 text-muted-foreground"
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        <LogOut className="h-4 w-4" aria-hidden />
        Log out
      </Button>
    </aside>
  );
}

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <Sidebar className="w-full border-0" />
      </SheetContent>
    </Sheet>
  );
}

export function AppHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <MobileNavigation />
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
