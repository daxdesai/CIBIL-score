"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { LoadingState } from "@/components/shared/LoadingState";
import { AppHeader, Sidebar } from "@/components/layout/AppShell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated, sessionExpired, dismissSessionExpired, touchActivity } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  useEffect(() => {
    const onActivity = () => touchActivity();
    window.addEventListener("click", onActivity);
    window.addEventListener("keydown", onActivity);
    return () => {
      window.removeEventListener("click", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, [touchActivity]);

  if (!isHydrated) {
    return <LoadingState message="Securing your session..." />;
  }

  if (!isAuthenticated) {
    return <LoadingState message="Redirecting to login..." />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar className="hidden lg:flex" />
        <div className="flex min-h-screen flex-1 flex-col">{children}</div>
      </div>
      <Dialog open={sessionExpired} onOpenChange={dismissSessionExpired}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session timed out</DialogTitle>
            <DialogDescription>
              For your security, your session ended after a period of inactivity. Please
              sign in again to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button asChild>
              <Link href="/login">Sign in again</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { AppHeader };
