"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MaskedValue } from "@/components/shared/MaskedValue";
import type { CreditAccount } from "@/lib/mock-data";
import { AccountCard } from "@/components/credit/AccountCard";

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function AccountTable({ accounts }: { accounts: CreditAccount[] }) {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Account Type</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Open Date</TableHead>
              <TableHead>Credit Limit</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.institution}</TableCell>
                <TableCell>{account.accountType}</TableCell>
                <TableCell>
                  <MaskedValue value={account.accountNumberMasked} />
                </TableCell>
                <TableCell>{account.openDate}</TableCell>
                <TableCell>
                  {account.creditLimit ? formatInr(account.creditLimit) : "—"}
                </TableCell>
                <TableCell>{formatInr(account.currentBalance)}</TableCell>
                <TableCell>
                  <StatusBadge
                    status={
                      account.paymentStatus === "On Time"
                        ? "Excellent"
                        : account.paymentStatus === "Late"
                          ? "Needs Attention"
                          : "Good"
                    }
                  />
                </TableCell>
                <TableCell>{account.accountStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid gap-4 md:hidden">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </>
  );
}
