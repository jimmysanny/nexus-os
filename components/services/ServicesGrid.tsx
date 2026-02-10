"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  ShoppingCart,
  Search,
  PenTool,
  Code2,
  Palette,
  Share2,
  BarChart3,
} from "lucide-react";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: Monitor,
    name: "Web Design",
    price: "From $300",
    description:
      "Stunning, conversion-focused websites that make your brand impossible to ignore. We design with purpose.",
    includes: [
      "Custom responsive design",
      "UI/UX prototyping in Figma",
      "Mobile-first approach",
      "Performance optimization",
      "SEO-ready markup",
      "2-3 rounds of revisions",
    ],
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    price: "From $600",
    description:
      "Full-featured online stores with secure payments, inventory management, and seamless checkout.",
    includes: [
      "Custom storefront design",
      "Payment gateway integration (M-Pesa, Paystack, Stripe)",
      "Product & inventory management",
      "Order tracking system",
      "Customer accounts",
      "Mobile-optimized checkout",
    ],
  },
  {
    icon: Search,
    name: "SEO & Content",
    price: "From $100/mo",
    description:
      "Dominate search results with data-driven SEO strategies and compelling content that ranks.",
    includes: [
      "Technical SEO audit",
      "Keyword research & strategy",
      "On-page optimization",
      "Content calendar creation",
      "Monthly blog articles",
      "Performance reporting",
    ],
  },
  {
    icon: PenTool,
    name: "Copywriting",
    price: "From $50",
    description:
      "Words that sell. From landing pages to email sequences that convert visitors into paying customers.",
    includes: [
      "Brand voice development",
      "Landing page copy",
      "Email sequences",
      "Ad copy (Google & Social)",
      "Product descriptions",
      "Blog content",
    ],
  },
  {
    icon: Code2,
    name: "Full Stack Development",
    price: "From $1,200",
    description:
      "Custom web applications built with modern technologies. Scalable, secure, and blazing fast.",
    includes: [
      "Next.js / React applications",
      "API development",
      "Database design & setup",
      "Authentication & authorization",
      "Payment integration",
      "Deployment & DevOps",
    ],
  },
  {
    icon: Palette,
    name: "Brand Identity",
    price: "From $200",
    description:
      "Complete brand packages that give your business a distinctive, memorable identity.",
    includes: [
      "Logo design (3 concepts)",
      "Color palette & typography",
      "Brand guidelines document",
      "Business card design",
      "Social media templates",
      "Brand asset package",
    ],
  },
  {
    icon: Share2,
    name: "Social Media Management",
    price: "From $150/mo",
    description:
      "Strategic social media presence that builds community, drives engagement, and grows your audience.",
    includes: [
      "Content strategy",
      "Post design & copywriting",
      "Scheduling & publishing",
      "Community management",
      "Analytics & reporting",
      "Influencer outreach",
    ],
  },
  {
    icon: BarChart3,
    name: "Google Ads Management",
    price: "From $200/mo",
    description:
      "ROI-focused Google Ads campaigns that put your business in front of the right customers.",
    includes: [
      "Campaign strategy",
      "Keyword research",
      "Ad copywriting",
      "Landing page optimization",
      "Bid management",
      "Monthly performance reports",
    ],
  },
];

export default function ServicesGrid() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 md:p-10"
            >
              <div className="grid gap-8 md:grid-cols-3">
                {/* Left */}
                <div className="md:col-span-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon size={24} />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {service.name}
                  </h2>
                  <p className="mt-1 font-heading text-sm font-medium text-primary">
                    {service.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    Get Started
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* Right - Includes */}
                <div className="md:col-span-2">
                  <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {"What's included"}
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
