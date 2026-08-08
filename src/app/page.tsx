import Link from "next/link";
import {
  Shield,
  Lock,
  Zap,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingFooter, MarketingHeader } from "@/components/layout/MarketingLayout";

const trustItems = [
  { icon: Shield, title: "Secure", text: "Bank-grade security practices for your session." },
  { icon: Lock, title: "Privacy Protected", text: "Sensitive details are masked and never stored locally." },
  { icon: Zap, title: "Fast & Easy", text: "Check your score in a few guided steps." },
  { icon: Building2, title: "Trusted Banking Experience", text: "Designed for clarity and confidence." },
];

const steps = [
  { step: "1", title: "Enter your details", text: "Provide basic information to begin securely." },
  { step: "2", title: "Verify your identity", text: "Confirm with a one-time password on your mobile." },
  { step: "3", title: "Check your credit score", text: "View your latest illustrative credit score." },
  { step: "4", title: "Understand your credit profile", text: "Explore factors, accounts, and recommendations." },
];

const scoreBands = [
  { range: "300–579", label: "Poor", width: "20%" },
  { range: "580–669", label: "Fair", width: "25%" },
  { range: "670–739", label: "Good", width: "25%" },
  { range: "740–799", label: "Very Good", width: "20%" },
  { range: "800–900", label: "Excellent", width: "10%" },
];

const faqs = [
  {
    q: "What is a credit score?",
    a: "A credit score is a numeric summary of your credit history used by lenders to assess creditworthiness. This demo uses illustrative data only.",
  },
  {
    q: "How is a credit score calculated?",
    a: "Scores typically consider payment history, credit utilization, length of credit history, credit mix, and recent enquiries. Exact models vary by bureau.",
  },
  {
    q: "Does checking my own score affect my credit score?",
    a: "Checking your own score is usually recorded as a soft enquiry and generally does not impact your score like multiple hard enquiries might.",
  },
  {
    q: "How often should I check my score?",
    a: "Many customers review their credit profile every few months or before major loan applications.",
  },
  {
    q: "What can affect my score?",
    a: "Late payments, high utilization, frequent credit applications, and negative account status can influence your profile over time.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="space-y-6">
              <p className="text-sm font-medium text-primary">Credit Health</p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Know Your Credit Score. Make Better Financial Decisions.
              </h1>
              <p className="text-lg text-muted-foreground">
                Understand where you stand, monitor changes over time, and explore
                actionable insights—all in a secure, easy-to-use banking experience.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Check My Credit Score
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#how-it-works">Learn How It Works</a>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md" aria-hidden>
              <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary/20">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Illustrative
                    </p>
                    <p className="text-4xl font-semibold text-primary">782</p>
                    <p className="text-sm text-muted-foreground">Very Good</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>300</span>
                    <span>900</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full w-[68%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" aria-labelledby="trust-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="trust-heading" className="sr-only">
              Trust and security
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map(({ icon: Icon, title, text }) => (
                <Card key={title} className="shadow-sm">
                  <CardContent className="space-y-2 pt-6">
                    <Icon className="h-8 w-8 text-primary" />
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold">How It Works</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <Card key={item.step} className="shadow-sm">
                  <CardContent className="space-y-2 pt-6">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {item.step}
                    </span>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="credit-score" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold">Understanding the score range</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Illustrative ranges for demo purposes only—not official bureau classifications.
            </p>
            <div className="mt-8 space-y-3">
              {scoreBands.map((band) => (
                <div key={band.range} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium">{band.range}</span>
                  <div className="h-3 flex-1 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: band.width }}
                    />
                  </div>
                  <span className="w-24 text-sm text-muted-foreground">{band.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="insights" className="border-t border-border bg-card py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold">Benefits</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Track your credit health over time",
                "Understand score factors and their impact",
                "Monitor credit enquiries on your profile",
                "Review credit accounts in one place",
                "Make informed financial decisions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
