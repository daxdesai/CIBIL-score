"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CreditEnquiry } from "@/lib/mock-data";

function formatInr(amount?: number) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function EnquiryTable({ enquiries }: { enquiries: CreditEnquiry[] }) {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Enquiry Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="font-medium">{enquiry.institution}</TableCell>
                <TableCell>{enquiry.date}</TableCell>
                <TableCell>{enquiry.enquiryType}</TableCell>
                <TableCell>{formatInr(enquiry.amount)}</TableCell>
                <TableCell>{enquiry.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid gap-4 md:hidden">
        {enquiries.map((enquiry) => (
          <Card key={enquiry.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{enquiry.institution}</CardTitle>
              <p className="text-sm text-muted-foreground">{enquiry.enquiryType}</p>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{enquiry.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span>{formatInr(enquiry.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span>{enquiry.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
