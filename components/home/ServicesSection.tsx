"use client";

import {
  Monitor,
  ShoppingCart,
  Search,
  PenTool,
  Code2,
  Palette,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: Monitor,
    name: "Web Design",
    description:
      "Stunning, conversion-focused websites that make your brand impossible to ignore.",
    price: "From $300",
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    description:
      "Full-featured online stores with secure payments and seamless checkout experiences.",
    price: "From $600",
  },
  {
    icon: Search,
    name: "SEO & Content",
    description:
      "Dominate search results with data-driven SEO strategies and compelling content.",
    price: "From $100/mo",
  },
  {
    icon: PenTool,
    name: "Copywriting",
    description:
      "Words that sell. From landing pages to email sequences that convert visitors into customers.",
    price: "From $50",
  },
  {
    icon: Code2,
    name: "Full Stack Dev",
    description:
      "Custom web applications built with modern technologies. Scalable, secure, and fast.",
    price: "From $1,200",
  },
  {
    icon: Palette,
    name: "Brand Identity",
    description:
      "Complete brand packages including logo, color palette, typography, and brand guidelines.",
    price: "From $200",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            What We Do
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Services built for growth</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              icon={service.icon}
              name={service.name}
              description={service.description}
              price={service.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
