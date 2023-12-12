import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Fonts
const nunitoSans = Nunito_Sans({
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
          <Toaster position="bottom-right" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
