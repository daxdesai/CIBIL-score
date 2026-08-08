"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Phone, Mail } from "lucide-react";
import { MarketingFooter, MarketingHeader } from "@/components/layout/MarketingLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "How do I check my credit score?",
    a: "Select Check Credit Score on the homepage, sign in with your mobile number, and complete OTP verification.",
  },
  {
    q: "Is this connected to CIBIL?",
    a: "This is a frontend demo with mock data. It is not affiliated with TransUnion CIBIL unless officially authorized.",
  },
  {
    q: "How do I report an issue?",
    a: "Use the report form below or call customer support during banking hours.",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return faqs;
    return faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
          <div>
            <h1 className="text-3xl font-semibold">Help & support</h1>
            <p className="mt-2 text-muted-foreground">
              Search FAQs, contact support, or report an issue.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search help articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search help"
            />
          </div>
          <Accordion type="single" collapsible>
            {filtered.map((faq, i) => (
              <AccordionItem key={faq.q} value={`help-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results found.</p>
          ) : null}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Contact support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden />
                1800-000-0000 (demo)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden />
                support@bankname.example
              </p>
              <Button variant="outline" asChild>
                <Link href="/login">Report an issue</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
