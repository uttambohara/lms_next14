import ConfettiProvider from "@/hooks/confetti-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Fonts
const nunitoSans = Barlow({
  subsets: ["latin"],
  weight: "400",
});

// Metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunitoSans.className}>
          <ConfettiProvider />
          <Toaster position="bottom-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
