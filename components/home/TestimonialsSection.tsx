"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amina Wanjiku",
    role: "Founder, Savanna Coffee Co.",
    quote:
      "NEXUS transformed our online presence completely. Our e-commerce sales increased by 400% in the first three months. They understand African markets like no other agency.",
  },
  {
    name: "Daniel Ochieng",
    role: "CTO, MobiPay Africa",
    quote:
      "Working with NEXUS was like having an elite tech team embedded in our company. They delivered a complex fintech platform on time and under budget. Incredible work.",
  },
  {
    name: "Grace Mutua",
    role: "Managing Director, Safari Luxe Hotels",
    quote:
      "From the discovery call to launch, NEXUS exceeded every expectation. Our website now reflects the luxury of our brand and bookings have never been higher.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Testimonials
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">Trusted by ambitious businesses</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="flex flex-col rounded-lg border border-border bg-card p-8"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>

              <div className="mt-6 border-t border-border pt-6">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
