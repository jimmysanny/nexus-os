import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus OS — Built for African Creators",
  description: "Sell your knowledge. Own your platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Toaster position="top-right" richColors />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
