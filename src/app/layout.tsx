import type { Metadata } from "next";
import { Syne, Sora } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bethlehem TV — Digital Space | Renewal Underway",
  description: "A digital entrance for Bethlehem TV. Our digital space is currently being renewed. We're preparing something new.",
  keywords: ["Bethlehem TV", "Christian Media", "Faith", "Broadcast", "Renewal"],
  openGraph: {
    title: "Bethlehem TV — Digital Space",
    description: "Our digital space is being renewed. We're preparing something new.",
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
      className={`${syne.variable} ${sora.variable} h-full overflow-hidden antialiased dark`}
    >
      <body className="h-full w-full overflow-hidden bg-[#0A0C0E] text-[#EDE7DC] font-sora selection:bg-[#E8913C]/20 selection:text-[#EDE7DC]">
        {children}
      </body>
    </html>
  );
}

