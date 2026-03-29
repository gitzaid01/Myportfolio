import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio built with Next.js & TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ── Font Awesome ── */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-zinc-950 text-white`}
      >
        {/* ── Global grid background ── */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(139,92,246,0.05) 0px,
                rgba(139,92,246,0.05) 1px,
                transparent 1px,
                transparent 1rem
              ),
              repeating-linear-gradient(
                180deg,
                rgba(139,92,246,0.05) 0px,
                rgba(139,92,246,0.05) 1px,
                transparent 1px,
                transparent 1rem
              )
            `,
          }}
        />

        {/* ── Top ruler ── */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none"
          style={{ height: 20 }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(9,9,11,0.92)" }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: "rgba(139,92,246,0.3)" }} />
          {Array.from({ length: 120 }, (_, i) => {
            const isMajor = i % 8 === 0;
            return (
              <div
                key={i}
                className="absolute bottom-0"
                style={{
                  left: i * 16,
                  width: 1,
                  height: isMajor ? 10 : 5,
                  background: isMajor ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.2)",
                }}
              >
                {isMajor && i > 0 && (
                  <span
                    className="absolute font-mono"
                    style={{ fontSize: 7, color: "rgba(139,92,246,0.55)", top: -11, left: 2, whiteSpace: "nowrap" }}
                  >
                    {i}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Left ruler ── */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 bottom-0 z-50 pointer-events-none select-none"
          style={{ width: 20 }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(9,9,11,0.92)" }} />
          <div className="absolute top-0 right-0 bottom-0" style={{ width: 1, background: "rgba(139,92,246,0.3)" }} />
          {Array.from({ length: 80 }, (_, i) => {
            const isMajor = i % 8 === 0;
            return (
              <div
                key={i}
                className="absolute right-0"
                style={{
                  top: i * 16,
                  height: 1,
                  width: isMajor ? 10 : 5,
                  background: isMajor ? "rgba(139,92,246,0.6)" : "rgba(139,92,246,0.2)",
                }}
              >
                {isMajor && i > 0 && (
                  <span
                    className="absolute font-mono"
                    style={{ fontSize: 7, color: "rgba(139,92,246,0.55)", left: -14, top: 1, whiteSpace: "nowrap" }}
                  >
                    {i}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Corner cap ── */}
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 z-[60] pointer-events-none"
          style={{
            width: 20,
            height: 20,
            background: "rgba(9,9,11,0.92)",
            borderRight: "1px solid rgba(139,92,246,0.3)",
            borderBottom: "1px solid rgba(139,92,246,0.3)",
          }}
        />

        <Header />
        <main className="relative z-10 mt-20 pl-5 bg-transparent max-w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}