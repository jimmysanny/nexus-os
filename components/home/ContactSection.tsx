"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

const services = [
  "Web Design",
  "E-Commerce",
  "SEO & Content",
  "Copywriting",
  "Full Stack Development",
  "Brand Identity",
  "Social Media Management",
  "Google Ads Management",
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently fail for demo
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-12"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Message sent!
            </h3>
            <p className="mt-3 text-muted-foreground">
              {"Thank you for reaching out. We'll get back to you within 24 hours."}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Get in Touch
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              <span className="text-balance">{"Let's start something great"}</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Ready to take your business to the next level? Tell us about your
              project and {"we'll"} craft a strategy tailored to your goals.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Send size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email us</p>
                  <p className="text-sm text-muted-foreground">hello@nexus.agency</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-lg border border-border bg-card p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  Business Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-sm font-medium text-foreground">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Describe your project, goals, and timeline..."
                className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
