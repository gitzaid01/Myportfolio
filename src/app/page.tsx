"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import emailjs from "@emailjs/browser";

// ─── Memoised service card ────────────────────────────────────────────────────
const ServiceCard = memo(function ServiceCard({
  title, description, image, imageAlt, iconPath,
}: {
  title: string; description: string; image: string; imageAlt: string; iconPath: string;
}) {
  return (
    <div className="flex flex-col items-start h-auto sm:h-[500px] px-2 group">
      <div className="relative w-full max-w-full h-72 sm:h-96 bg-zinc-900 overflow-hidden mb-6 rounded-lg border border-violet-900/30">
        <svg xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 m-auto h-16 w-16 text-violet-400 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
        <img src={image} alt={imageAlt} loading="lazy" decoding="async"
          className="absolute top-0 left-0 w-full h-full object-cover -translate-x-full opacity-0 transition-transform transition-opacity duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-white text-left w-full max-w-xs tracking-tight">
        {title}
      </h3>
      <p className="text-zinc-400 max-w-xs text-left text-sm sm:text-base">{description}</p>
    </div>
  );
});

const SERVICES = [
  { title: "Web Development", description: "Building responsive, performant, and scalable websites tailored to your brand and goals.", image: "./image2.jpg", imageAlt: "Web Development", iconPath: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  { title: "UI/UX Design", description: "Crafting intuitive and engaging user experiences that keep your audience coming back.", image: "./image1.jpg", imageAlt: "UI/UX Design", iconPath: "M15.232 5.232l3.536 3.536M16.5 7l-9 9-4 1 1-4 9-9z" },
  { title: "Consulting & Strategy", description: "Helping you define the right digital strategies to maximize impact and growth.", image: "./image3.jpg", imageAlt: "Consulting & Strategy", iconPath: "M11 3a7 7 0 00-4 12.9v2.1a1 1 0 002 0v-2.1a7 7 0 004-12.9zM12 17h.01" },
  { title: "Content Writing", description: "Crafting compelling content that resonates with your audience and drives engagement.", image: "./image4.jpg", imageAlt: "Content Writing", iconPath: "M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2z" },
] as const;

export default function Home() {
  // ── Single audio ref + single playing state ──
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(formatTime(audio.duration));
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => audio.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((e) => console.warn("Audio play failed:", e));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // ── Canvas ──
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.3, o: Math.random() * 0.35 + 0.05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(124,58,237,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.o})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x, dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.07 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // ── Typewriter ──
  const [titleText, setTitleText] = useState("");
  const fullTitle = "THE STORY\nBEHIND THE\nVISION";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTitleText(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, []);

  // ── Staggered paragraphs ──
  const [parasVisible, setParasVisible] = useState([false, false, false, false]);
  useEffect(() => {
    [0, 1, 2, 3].forEach((idx) => {
      setTimeout(() => setParasVisible((prev) => { const n = [...prev]; n[idx] = true; return n; }), 1200 + idx * 400);
    });
  }, []);

  // ── Counters ──
  const [counts, setCounts] = useState({ s1: 0, s2: 0, s3: 0 });
  useEffect(() => {
    const targets = { s1: 48, s2: 120, s3: 500 };
    (Object.keys(targets) as Array<keyof typeof targets>).forEach((key) => {
      let current = 0;
      const step = targets[key] / 60;
      const interval = setInterval(() => {
        current = Math.min(current + step, targets[key]);
        setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
        if (current >= targets[key]) clearInterval(interval);
      }, 30);
    });
  }, []);

  // ── Timestamp ──
  const [timestamp, setTimestamp] = useState("");
  useEffect(() => {
    const update = () => setTimestamp(new Date().toUTCString().slice(0, 25));
    update(); const t = setInterval(update, 1000); return () => clearInterval(t);
  }, []);

  // ── Email form ──
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const sendEmail = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); if (!form.current) return; setLoading(true);
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    ).then(() => { setStatus("Message sent successfully!"); form.current?.reset(); setLoading(false); })
     .catch((err) => { console.error(err); setStatus("Failed to send message. Try again."); setLoading(false); });
  }, []);

  const paras = [
    <><strong className="text-white">Electrosstuffs — Powering Innovation, One Idea at a Time.</strong> In a world where technology shapes every moment of our lives, Electrosstuffs is your trusted partner. More than just an electronics store — we're a hub of innovation.</>,
    <>Whether you're a hobbyist exploring Arduino, a robotics enthusiast, or a professional seeking cutting-edge IT solutions — our marketplace offers high-quality components and modules carefully selected for performance.</>,
    <>But we go beyond hardware. Our IT services and SaaS solutions help businesses thrive — building robust web applications, scalable cloud platforms, and automation pipelines tailored to help you grow and lead.</>,
    <><strong className="text-white">Discover, create, and innovate with Electrosstuffs</strong> — because technology isn't just about machines. It's about empowering people to dream bigger and change the world.</>,
  ];

  return (
    <div className="text-white relative" style={{ fontFamily: "'Space Mono', monospace" }}>

      {/* ── Global scanlines over entire page ── */}
      <div className="pointer-events-none fixed inset-0 z-[5]" style={{
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)"
      }} />

      {/* ── Global vignette ── */}
      <div className="pointer-events-none fixed inset-0 z-[5]" style={{
        background: "radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.6) 100%)"
      }} />

      {/* ── Global particle canvas ── */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-[2] pointer-events-none" />

      {/* ── Timestamp ── */}
      <div className="fixed top-6 right-4 z-50 font-mono text-[10px] tracking-[2px] text-zinc-600 hidden sm:block">
        {timestamp}
      </div>

      {/* ── Corner brackets ── */}
      {["top-6 left-6 border-t border-l","top-6 right-6 border-t border-r","bottom-6 left-6 border-b border-l","bottom-6 right-6 border-b border-r"].map((cls, i) => (
        <div key={i} className={`fixed w-4 h-4 border-cyan-400/30 z-[6] pointer-events-none ${cls}`} />
      ))}

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 pt-10 pb-16 lg:px-4 border-b border-violet-900/30">
     

        <div className="flex items-center gap-2 mb-4 font-mono text-[10px] tracking-[3px] text-amber-400">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] animate-pulse" />
          LIVE · PORTFOLIO BROADCAST
        </div>

        <span className="block mb-3 font-mono text-[10px] tracking-widest" style={{ color: "rgba(139,92,246,0.5)" }}>
          text-7xl · font-extrabold · tracking-tighter
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-start tracking-tighter leading-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          DESIGN WITH VISION
          <br />DEVELOP WITH PRECISION
          <br />DELIVER WITH IMPACT
        </h1>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          ELECTROSSTUFFS — CINEMATIC SECTION
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen border-b border-violet-900/30">

        {/* LEFT */}
        <div className="flex flex-col justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-violet-900/30 relative overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50 animate-[scanbeam_4s_ease-in-out_infinite]" />

          <div className="flex items-center gap-2 mb-6 font-mono text-[10px] tracking-[3px] text-amber-400">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] animate-pulse" />
            BROADCASTING LIVE · EST. 2024
          </div>

          <div className="mb-6">
            <img src="./ElectrosStuff.png" alt="Electrosstuffs Logo" className="mb-3 mx-auto md:mx-0 max-h-12 object-contain" />
            <div className="text-[9px] tracking-[4px] text-zinc-500 font-mono">
              POWERING INNOVATION · ONE IDEA AT A TIME
            </div>
          </div>

          <div className="relative border border-violet-700/40 overflow-hidden">
            <img src="./image5.png" alt="Electrosstuffs"
              className="w-full h-full object-cover brightness-50 saturate-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent" />
            <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[2px] text-cyan-400">
              CAM_01 · FEED ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-violet-900/40">
            {[{ val: counts.s1, label: "PROJECTS" }, { val: counts.s2, label: "CLIENTS" }, { val: counts.s3, label: "PRODUCTS" }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl text-amber-400 leading-none font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {s.val}+
                </div>
                <div className="text-[9px] tracking-[2px] text-zinc-500 font-mono mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center p-8 md:p-12 relative overflow-hidden">
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[3px] text-violet-400 mb-4">
            <span className="w-5 h-px bg-violet-400" />
            FEATURE STORY · TECHNOLOGY & INNOVATION
          </div>

          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider leading-tight mb-6 min-h-[4rem]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {titleText.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
            <span className="opacity-40 animate-pulse">_</span>
          </div>

          {/* Ticker */}
          <div className="relative overflow-hidden border-t border-b border-violet-800/30 py-2 mb-6">
            <span className="absolute left-0 top-0 bottom-0 bg-violet-600 font-mono text-[9px] tracking-[2px] text-white px-2 flex items-center z-10">LIVE</span>
            <div className="flex gap-0 pl-14 whitespace-nowrap animate-[ticker_20s_linear_infinite]">
              {[0, 1].map((k) => (
                <span key={k} className="font-mono text-[11px] tracking-[2px] text-amber-400 pr-12">
                  ARDUINO · ROBOTICS · MICROCONTROLLERS · SENSORS · AUTOMATION · SAAS · CLOUD · WEB APPS · IOT · INNOVATION HUB ·
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {paras.map((p, i) => (
              <div key={i}
                className="text-[11px] leading-relaxed text-zinc-400 border-l-2 pl-3 transition-all duration-700"
                style={{
                  borderColor: parasVisible[i] ? "rgba(124,58,237,0.4)" : "transparent",
                  opacity: parasVisible[i] ? 1 : 0,
                  transform: parasVisible[i] ? "translateY(0)" : "translateY(10px)",
                }}>
                {p}
              </div>
            ))}
          </div>

          {/* Audio player — single ref, single state */}
          <div className="mt-6 flex items-center gap-3 border border-violet-800/40 p-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/10 to-transparent pointer-events-none" />
            <button onClick={togglePlay}
              className="w-8 h-8 border border-violet-500 text-violet-400 flex items-center justify-center text-xs hover:bg-violet-600 hover:text-white transition-colors flex-shrink-0 z-10">
              {isPlaying ? "⏸" : "▶"}
            </button>
            <div className="z-10">
              <div className="font-mono text-[9px] tracking-[2px] text-zinc-500">LISTEN TO ARTICLE</div>
              <div className="font-mono text-[9px] tracking-[2px] text-zinc-600 mt-0.5">{duration} · AUDIO BROADCAST</div>
            </div>
            <div className="flex items-end gap-0.5 ml-auto z-10">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i} className="w-0.5 rounded-sm bg-violet-500 transition-all duration-300"
                  style={{ height: isPlaying ? `${4 + Math.abs(Math.sin(i * 0.7)) * 14}px` : "4px", opacity: isPlaying ? 1 : 0.3 }} />
              ))}
            </div>
            <audio ref={audioRef} src="/my-audio.mp3" onEnded={() => setIsPlaying(false)} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          INTRODUCING MYSELF
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 border-b border-violet-900/30 px-8 py-16">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30 animate-[scanbeam_6s_ease-in-out_infinite]" />

        <div className="flex items-center gap-2 mb-6 font-mono text-[9px] tracking-[3px] text-violet-400">
          <span className="w-5 h-px bg-violet-400" />
          PERSONAL BROADCAST · SEGMENT 02
        </div>

        <div className="max-w-2xl">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Introducing Myself
          </h3>
          <button className="font-mono text-[10px] tracking-[3px] text-violet-400 border border-violet-700/50 px-5 py-2 mb-8 hover:bg-violet-900/30 transition-colors">
            EXPLORE MY JOURNEY →
          </button>
          <p className="text-zinc-400 leading-relaxed text-sm tracking-wide border-l-2 border-violet-700/40 pl-4">
            I wholeheartedly believe in the art and science of crafting digital experiences that transcend the ordinary —
            creations that don't just look visually stunning, but also generate real, measurable results that leave a lasting impact.
            Every pixel I place, every line of code I write, is driven by an unwavering passion for transforming challenges
            into elegant solutions. This craft is not merely my profession — it is the core of my creative existence.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED WORKS
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 border-b border-violet-900/30">
        <div className="absolute inset-0 bg-amber-300 z-0" />
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)"
        }} />
        <div className="relative z-[2] flex flex-col items-center justify-center py-10 px-2 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 font-mono text-[9px] tracking-[3px] text-black/50">
            <span className="w-2 h-2 rounded-full bg-black/40 animate-pulse" />
            SEGMENT 03 · SELECTED WORKS
          </div>
          <span className="font-extrabold text-black tracking-tighter border-b-4 border-black pb-4 text-center w-full
            text-[18vw] sm:text-[16vw] md:text-8xl lg:text-[160px] xl:text-[200px]">
            FEATURED
          </span>
          <span className="font-extrabold text-black tracking-tighter text-center w-full pt-4
            text-[18vw] sm:text-[16vw] md:text-8xl lg:text-[160px] xl:text-[200px]">
            WORKS
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-b border-violet-900/30 py-16">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30 animate-[scanbeam_7s_ease-in-out_infinite]" />

        <div className="max-w-7xl mx-auto text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-4 font-mono text-[9px] tracking-[3px] text-violet-400">
            <span className="w-5 h-px bg-violet-400" />
            SEGMENT 04 · CAPABILITIES
            <span className="w-5 h-px bg-violet-400" />
          </div>
          <p className="font-mono text-[10px] tracking-[3px] text-amber-400 mb-2">ELEVATE YOUR DIGITAL PRESENCE</p>
          <h1 className="font-black mb-8 text-white text-7xl sm:text-9xl md:text-8xl lg:text-[160px] tracking-tighter"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            SERVICES
          </h1>

          {/* Marquee */}
          <div className="overflow-hidden border-t border-b border-violet-900/30 py-4 mb-16"
            style={{ transform: "rotate(-2deg) scale(0.98)" }}>
            {[
              { text: "CAPTURE. CREATE. INSPIRE. CAPTURE. CREATE. INSPIRE. CAPTURE. CREATE. INSPIRE.", dir: "normal" },
              { text: "INNOVATE. DESIGN. DELIVER. INNOVATE. DESIGN. DELIVER. INNOVATE. DESIGN. DELIVER.", dir: "reverse" },
              { text: "BUILD. OPTIMIZE. SCALE. BUILD. OPTIMIZE. SCALE. BUILD. OPTIMIZE. SCALE.", dir: "normal" },
            ].map((m, i) => (
              <div key={i} className="whitespace-nowrap overflow-hidden">
                <div className="inline-block font-mono font-extrabold text-2xl sm:text-3xl tracking-widest px-10 animate-[ticker_15s_linear_infinite]"
                  style={{ animationDirection: m.dir as any, color: i === 1 ? "#f59e0b" : "rgba(139,92,246,0.6)" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 border border-violet-900/30 p-8">
            {SERVICES.map((svc) => <ServiceCard key={svc.title} {...svc} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-16 px-6 sm:px-10 lg:px-20 border-b border-violet-900/30">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30 animate-[scanbeam_8s_ease-in-out_infinite]" />

        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 font-mono text-[9px] tracking-[3px] text-violet-400">
            <span className="w-5 h-px bg-violet-400" />
            SEGMENT 05 · OPEN CHANNEL
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3 tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Get In Touch
          </h2>
          <p className="font-mono text-[11px] text-zinc-500 mb-8 border-l-2 border-violet-700/40 pl-3">
            I'd love to hear from you — whether you have a question, a project idea, or just want to say hello.
          </p>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="from_name" placeholder="YOUR NAME" required
                className="w-full p-3 bg-transparent border border-violet-900/50 font-mono text-xs tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors" />
              <input type="email" name="from_email" placeholder="YOUR EMAIL" required
                className="w-full p-3 bg-transparent border border-violet-900/50 font-mono text-xs tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
            <textarea name="message" placeholder="YOUR MESSAGE" rows={5} required
              className="w-full p-3 bg-transparent border border-violet-900/50 font-mono text-xs tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors resize-none" />
            <button type="submit" disabled={loading}
              className="w-full py-3 border border-violet-500 font-mono text-xs tracking-[3px] text-violet-400 hover:bg-violet-900/30 transition-colors disabled:opacity-40">
              {loading ? "TRANSMITTING..." : "SEND MESSAGE →"}
            </button>
          </form>
          {status && <p role="status" className="mt-4 font-mono text-[10px] tracking-[2px] text-violet-400">{status}</p>}

          <div className="mt-10 flex gap-6">
            {[
              { href: "https://github.com/yourusername", icon: "fa-github", label: "GitHub" },
              { href: "https://linkedin.com/in/yourusername", icon: "fa-linkedin", label: "LinkedIn" },
              { href: "mailto:youremail@example.com", icon: "fa-envelope", label: "Email" },
            ].map((s) => (
              <a key={s.label} href={s.href} target={s.icon !== "fa-envelope" ? "_blank" : undefined}
                rel="noopener noreferrer" aria-label={s.label}
                className="text-zinc-600 hover:text-violet-400 transition-colors">
                <i className={`fab ${s.icon} text-xl`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM MARQUEE
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 py-8 border-b border-violet-900/30 overflow-hidden">
        {[
          { text: "LET'S COLLABORATE • TURN IDEAS INTO REALITY • BUILD SOMETHING AMAZING • LET'S COLLABORATE • TURN IDEAS INTO REALITY • BUILD SOMETHING AMAZING •", dir: "normal", color: "text-zinc-600" },
          { text: "DESIGN • DEVELOP • DEPLOY • CREATE • INNOVATE • SCALE • DESIGN • DEVELOP • DEPLOY • CREATE • INNOVATE • SCALE •", dir: "reverse", color: "text-violet-700/60" },
          { text: "LET'S WORK TOGETHER • START YOUR PROJECT TODAY • UNLEASH YOUR BRAND'S POTENTIAL • LET'S WORK TOGETHER • START YOUR PROJECT TODAY •", dir: "normal", color: "text-zinc-600" },
        ].map((m, i) => (
          <div key={i} className="whitespace-nowrap overflow-hidden">
            <div className={`inline-block font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-widest ${m.color} animate-[ticker_18s_linear_infinite]`}
              style={{ animationDirection: m.dir as any }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM STRIP
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-7 bg-violet-700 overflow-hidden flex items-center">
        <div className="flex gap-0 whitespace-nowrap animate-[ticker_12s_linear_infinite]">
          {[0, 1].map((k) => (
            <span key={k} className="font-mono text-[10px] tracking-[3px] text-white/90 pr-16">
              ELECTROSSTUFFS · INNOVATION LAB · ROBOTICS · ARDUINO · SAAS · WEB DEV · UI/UX · CLOUD · AUTOMATION ·
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}