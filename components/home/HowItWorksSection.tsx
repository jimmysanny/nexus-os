"use client";

import { motion } from "framer-motion";
import { Phone, Target, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Discovery Call",
    description:
      "We learn about your business, goals, and vision. A free 30-minute strategy session to map out your path.",
  },
  {
    icon: Target,
    number: "02",
    title: "Strategy",
    description:
      "We craft a detailed plan with timelines, deliverables, and milestones tailored to your objectives.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Build",
    description:
      "Our team brings your vision to life with weekly updates, revisions, and transparent communication.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description:
      "We launch your project, provide training, and offer ongoing support to ensure lasting success.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="border-y border-border bg-card py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Our Process
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">How it works</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="relative"
            >
              <span className="font-heading text-5xl font-bold text-border">
                {step.number}
              </span>
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon size={20} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
