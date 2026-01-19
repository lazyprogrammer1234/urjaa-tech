import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Urjaa Tech and Power Solutions | Generator Sales & Service",
  description: "Authorized dealership for Kubota and Shyam Global (Mahindra) generators. Reliable power solutions for industrial and commercial needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-50 text-slate-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
