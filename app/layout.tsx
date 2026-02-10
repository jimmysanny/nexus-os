import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEXUS Agency | Nairobi's Premier Digital Agency",
    template: "%s | NEXUS Agency",
  },
  description:
    "We build digital empires. Premium web design, SEO, copywriting, and full-stack development for ambitious African businesses.",
  openGraph: {
    title: "NEXUS Agency | We Build Digital Empires",
    description:
      "Premium web design, SEO, copywriting, and full-stack development for ambitious African businesses.",
    url: "https://nexus.agency",
    siteName: "NEXUS Agency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS Agency | We Build Digital Empires",
    description:
      "Premium web design, SEO, copywriting, and full-stack development for ambitious African businesses.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#e8b84b",
          colorBackground: "#111111",
          colorText: "#f5f0e8",
          colorInputBackground: "#1a1a1a",
          colorInputText: "#f5f0e8",
        },
      }}
    >
      <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
