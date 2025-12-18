import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Import the pro font
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// 2. Configure the font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus OS",
  description: "Operating System for African Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* 3. APPLY THE FONT HERE (antialiased makes it sharp) */}
        <body className={`${inter.className} antialiased bg-gray-50 text-slate-900`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}