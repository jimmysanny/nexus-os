"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5.0", label: "Average Rating" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-6 font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Digital Agency / Nairobi
          </p>

          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-balance">
              We Build{" "}
              <span className="text-primary">Digital</span>{" "}
              Empires.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Premium web design, SEO, copywriting, and full-stack development
            for ambitious African businesses ready to dominate online.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
            >
              Start a Project
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/#work"
              className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-20 flex flex-wrap gap-12 border-t border-border pt-10 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
