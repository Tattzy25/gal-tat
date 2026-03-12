import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gallery.tattty.com"),
  title: "TaTTTy",
  description: "tattoo image generator gallery",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TaTTTy",
    description: "tattoo image generator gallery",
    url: "https://gallery.tattty.com",
    siteName: "tattty.com",
    type: "website",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn(sans.variable, mono.variable, "antialiased")}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Analytics />
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
