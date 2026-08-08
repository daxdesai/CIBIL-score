import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-primary">
          BankName
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
          aria-label="Main"
        >
          <a href="#credit-score" className="hover:text-foreground">
            Credit Score
          </a>
          <a href="#how-it-works" className="hover:text-foreground">
            How It Works
          </a>
          <a href="#insights" className="hover:text-foreground">
            Credit Insights
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQs
          </a>
          <Link href="/help" className="hover:text-foreground">
            Help
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Check Credit Score</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <p className="font-semibold">BankName</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo credit score experience. Not affiliated with TransUnion CIBIL.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-medium">Legal</p>
          <Link href="/help" className="block text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/help" className="block text-muted-foreground hover:text-foreground">
            Terms & Conditions
          </Link>
          <Link href="/help" className="block text-muted-foreground hover:text-foreground">
            Security
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-medium">Support</p>
          <Link href="/help" className="block text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <a href="#faq" className="block text-muted-foreground hover:text-foreground">
            FAQs
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Disclaimer</p>
          <p className="mt-2">
            Illustrative score ranges and data are for demonstration only. Always refer to
            official bureau communications for authoritative information.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BankName. All rights reserved.
      </div>
    </footer>
  );
}
