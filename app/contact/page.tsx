import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with NEXUS Agency. Let's discuss your next digital project. Based in Nairobi, serving clients across Africa.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nexus.agency",
    href: "mailto:hello@nexus.agency",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+254 700 000 000",
    href: "https://wa.me/254700000000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Left column */}
            <div className="lg:col-span-2">
              <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Contact Us
              </p>
              <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                <span className="text-balance">
                  {"Let's Build Something Great"}
                </span>
              </h1>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {"Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you within 24 hours."}
              </p>

              {/* Contact info */}
              <div className="mt-10 flex flex-col gap-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-foreground transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking CTA */}
              <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Book a Free Strategy Call
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  30 minutes to discuss your project, no strings attached.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
                >
                  Schedule a Call
                </a>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
