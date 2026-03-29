"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X, Radio } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [indiaTime, setIndiaTime] = useState("");
  const [usTime, setUsTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const getTime = (timeZone: string, label: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
    };
    return `${new Date().toLocaleTimeString("en-US", options)} ${label}`;
  };

  useEffect(() => {
    const update = () => {
      setIndiaTime(getTime("Asia/Kolkata", "IST"));
      setUsTime(getTime("America/New_York", "EST"));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "PROJECTS" },
    { href: "/about", label: "APPROACH" },
    { href: "/projects", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-40 transition-all duration-300 "
      style={{
        fontFamily: "'Space Mono', monospace",
        background: scrolled
          ? "rgba(5,5,8,0.95)"
          : "rgba(5,5,8,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(124,58,237,0.2)",
      }}
    >
      {/* ── Scan beam ── */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          bottom: 0,
          background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),transparent)",
          animation: "scanbeam 6s ease-in-out infinite",
        }}
      />

      {/* ── Top ticker strip ── */}
      <div
        className="hidden sm:flex items-center overflow-hidden border-b"
        style={{
          height: 22,
          borderColor: "rgba(124,58,237,0.15)",
          background: "rgba(124,58,237,0.04)",
        }}
      >
        {/* LIVE badge */}
        <div
          className="flex-shrink-0 flex items-center gap-1.5 px-3 h-full border-r"
          style={{ borderColor: "rgba(124,58,237,0.2)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            style={{ boxShadow: "0 0 5px #ef4444", animation: "pulse 1s ease-in-out infinite" }}
          />
          <span className="text-[9px] tracking-[3px] text-red-400">LIVE</span>
        </div>

        {/* Scrolling clocks + status */}
        <div className="flex items-center gap-8 px-4 whitespace-nowrap overflow-hidden">
          <span className="text-[9px] tracking-[2px] text-zinc-500">
            🕐 <span className="text-violet-400">{indiaTime}</span>
          </span>
          <span className="text-[9px] tracking-[2px] text-zinc-500">
            🕐 <span className="text-violet-400">{usTime}</span>
          </span>
          <span className="text-[9px] tracking-[2px] text-zinc-600">· PORTFOLIO BROADCAST · SIGNAL STRONG ·</span>
        </div>

        {/* Right side status */}
        <div
          className="ml-auto flex-shrink-0 flex items-center gap-2 px-3 h-full border-l"
          style={{ borderColor: "rgba(124,58,237,0.2)" }}
        >
          <span className="text-[9px] tracking-[2px] text-amber-500/70">ON AIR</span>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3 sm:pl-8">

        {/* Logo block */}
        <div className="flex items-center gap-3">
          {/* Signal icon */}
          {/* <div className="hidden sm:flex flex-col gap-0.5 items-center">
            {[1, 2, 3].map((h) => (
              <div
                key={h}
                className="bg-violet-500 rounded-sm"
                style={{
                  width: 3,
                  height: h * 4,
                  opacity: 0.6 + h * 0.1,
                  animation: `wave ${0.6 + h * 0.2}s ease-in-out infinite`,
                  animationDelay: `${h * 0.1}s`,
                }}
              />
            ))}
          </div> */}

          <div>
            <Link
              href="/"
              className="block text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none hover:text-violet-400 transition-colors"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ZAID
            </Link>
            <p
              className="text-[8px] tracking-[2px] leading-tight max-w-[180px] sm:max-w-[220px]"
              style={{ color: "rgba(139,92,246,0.5)" }}
            >
              "PURPOSE MAKES THE IMPOSSIBLE POSSIBLE" — NIETZSCHE
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Segment label */}
          <span
            className="text-[9px] tracking-[2px] mr-4 border-r pr-4"
            style={{ color: "rgba(124,58,237,0.4)", borderColor: "rgba(124,58,237,0.2)" }}
          >
            NAV_CHANNEL
          </span>

          {navLinks.map(({ href, label }, i) => (
            <Link
              key={label}
              href={href}
              className="group relative flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[2px] text-zinc-500 hover:text-white transition-colors"
            >
              <span
                className="text-[8px] tracking-widest"
                style={{ color: "rgba(124,58,237,0.3)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
              {/* underline on hover */}
              <span
                className="absolute bottom-0 left-3 right-3 h-px bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
              />
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/contact"
            className="ml-4 flex items-center gap-2 px-4 py-1.5 text-[10px] tracking-[2px] text-violet-400 border border-violet-700/50 hover:bg-violet-900/30 hover:border-violet-500 transition-all"
          >
            <Radio size={10} />
            OPEN CHANNEL
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center gap-2 text-[9px] tracking-[2px] text-zinc-400 hover:text-violet-400 transition-colors border border-violet-900/40 px-3 py-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <><X size={14} /> CLOSE</>
          ) : (
            <><Radio size={14} /> MENU</>
          )}
        </button>
      </nav>

      {/* ══════════════════════════════════════
          MOBILE FULL-SCREEN MENU
      ══════════════════════════════════════ */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col"
          style={{
            fontFamily: "'Space Mono', monospace",
            background: "rgba(5,5,8,0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)"
          }} />

          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
            style={{ borderColor: "rgba(124,58,237,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" style={{ boxShadow: "0 0 5px #ef4444" }} />
              <span className="text-[9px] tracking-[3px] text-red-400">BROADCAST MENU</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[9px] tracking-[2px] text-zinc-500 hover:text-white border border-violet-900/40 px-3 py-1.5 transition-colors"
            >
              <X size={12} /> CLOSE
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-1">
            {/* Segment label */}
            <div className="text-[9px] tracking-[3px] text-violet-700 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-violet-700" />
              NAVIGATION CHANNELS
            </div>

            {navLinks.map(({ href, label }, i) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="group flex items-baseline gap-4 py-3 border-b hover:border-violet-700/50 transition-colors"
                style={{ borderColor: "rgba(124,58,237,0.1)" }}
              >
                <span className="text-[9px] tracking-widest text-violet-800 flex-shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-600 group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {label}
                </span>
                <span className="ml-auto text-[9px] tracking-[2px] text-violet-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  → TUNE IN
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom section */}
          <div
            className="px-8 py-6 border-t flex flex-col gap-4 flex-shrink-0"
            style={{ borderColor: "rgba(124,58,237,0.15)" }}
          >
            <p className="text-[11px] tracking-[2px] text-zinc-600 border-l-2 border-violet-900/50 pl-3">
              READY TO TURN YOUR IDEAS INTO REALITY?
            </p>

            {/* Clocks on mobile */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] tracking-[2px] text-zinc-700">🕐 {indiaTime}</span>
              <span className="text-[9px] tracking-[2px] text-zinc-700">🕐 {usTime}</span>
            </div>

            {/* Social icons */}
            <div className="flex gap-5 mt-1">
              {[
                {
                  href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-400",
                  path: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"
                },
                {
                  href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400",
                  path: "M20.447 20.452H16.89V14.83c0-1.343-.027-3.073-1.873-3.073-1.874 0-2.162 1.463-2.162 2.975v5.72H9.297V9h3.409v1.561h.047c.475-.9 1.637-1.85 3.37-1.85 3.6 0 4.268 2.37 4.268 5.456v6.285zM5.337 7.433a1.989 1.989 0 1 1 0-3.978 1.989 1.989 0 0 1 0 3.978zM6.772 20.452H3.902V9h2.87v11.452z"
                },
                {
                  href: "https://twitter.com", label: "Twitter", color: "hover:text-zinc-200",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.24l-5.14-6.71-5.88 6.71H1.91l7.73-8.817L1.41 2.25h6.9l4.647 6.123 5.287-6.123zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z"
                },
              ].map(({ href, label, color, path }) => (
                <Link key={label} href={href} target="_blank" aria-label={label}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    className={`w-5 h-5 text-zinc-600 ${color} transition-colors`}
                    viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}