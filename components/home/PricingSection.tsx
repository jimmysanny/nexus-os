"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$300",
    description: "Perfect for small businesses getting started online.",
    featured: false,
    features: [
      "Custom landing page",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "2 rounds of revisions",
      "1 week delivery",
    ],
  },
  {
    name: "Business",
    price: "$700",
    description: "For growing businesses that need a complete digital presence.",
    featured: true,
    features: [
      "Multi-page website (up to 5)",
      "Custom design system",
      "Advanced SEO optimization",
      "CMS integration",
      "Analytics dashboard",
      "3 rounds of revisions",
      "2 weeks delivery",
      "30 days support",
    ],
  },
  {
    name: "Enterprise",
    price: "$1,500",
    description: "Full-scale digital solution for established businesses.",
    featured: false,
    features: [
      "Unlimited pages",
      "Custom web application",
      "E-commerce integration",
      "Payment gateway setup",
      "Full SEO strategy",
      "Performance optimization",
      "Unlimited revisions",
      "4 weeks delivery",
      "90 days support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="border-y border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Pricing
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Transparent pricing, real value</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            No hidden fees. No surprises. Choose a package or get a custom quote.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className={cn(
                "relative flex flex-col rounded-lg border p-8",
                plan.featured
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}

              <h3 className="font-heading text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/ project</span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className={cn(
                        "mt-0.5 shrink-0",
                        plan.featured ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={cn(
                  "mt-8 block rounded-full py-3 text-center text-sm font-medium transition-all duration-200",
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                )}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
