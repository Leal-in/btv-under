import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bethlehem TV — Devotional Portal | Launching Soon",
  description: "A sanctuary for daily spiritual renewal. Daily Scripture reflections, live broadcast streams, intercessory prayer network, and Holy Land teachings from Bethlehem TV.",
  keywords: ["Bethlehem TV", "Christian Devotional", "Daily Bread", "Bible Verse", "Prayer Request", "Live Christian TV", "Holy Land Teachings"],
  openGraph: {
    title: "Bethlehem TV — Devotional Portal | Launching Soon",
    description: "Daily grace and heavenly inspiration. Our all-new devotional portal is launching soon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050811] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
