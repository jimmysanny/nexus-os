"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Savanna Coffee Co.",
    category: "E-Commerce / Brand Identity",
    description: "Complete rebrand and online store for Kenya's premium coffee brand.",
    color: "from-amber-900/40 to-amber-700/20",
  },
  {
    title: "MobiPay Africa",
    category: "Full Stack Development",
    description: "Fintech platform processing mobile payments across East Africa.",
    color: "from-emerald-900/40 to-emerald-700/20",
  },
  {
    title: "Safari Luxe Hotels",
    category: "Web Design / SEO",
    description: "Luxury booking platform with 300% increase in organic traffic.",
    color: "from-sky-900/40 to-sky-700/20",
  },
  {
    title: "Nairobi Tech Hub",
    category: "Web Design / Copywriting",
    description: "Community platform connecting 10,000+ developers across Africa.",
    color: "from-rose-900/40 to-rose-700/20",
  },
];

export default function PortfolioSection() {
  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Selected Work
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Projects we are proud of</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="group relative flex aspect-[4/3] cursor-pointer flex-col justify-end overflow-hidden rounded-lg border border-border bg-card p-8"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-opacity duration-500 group-hover:opacity-80`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ArrowUpRight size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {project.category}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
