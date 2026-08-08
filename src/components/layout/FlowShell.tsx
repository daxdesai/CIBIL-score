import Link from "next/link";
import { Shield } from "lucide-react";

export function FlowShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="border-b border-border bg-background px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold text-primary">
          <Shield className="h-5 w-5" aria-hidden />
          BankName
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description ? (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
