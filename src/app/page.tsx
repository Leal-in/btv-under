"use client";

import React, { useState } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";

import AmbientSoundToggle from "@/components/AmbientSoundToggle";
import confetti from "canvas-confetti";
import { Wrench, Sparkles, Send, CheckCircle2, Heart, Radio, Mail } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#F59E0B", "#FBBF24", "#6366F1", "#FFFFFF"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#050811] text-slate-100">
      {/* Dynamic Starfield & Celestial Background */}
      <StarfieldBackground />

      {/* Radiant Golden Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 pt-8 pb-12">

        {/* Brand Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            {/* Bethlehem Star Emblem */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-2xl blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950 to-slate-950 border border-amber-400/60 flex items-center justify-center shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  fill="currentColor"
                >
                  <path d="M12 1L13.8 8.2L21 9L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9L10.2 8.2L12 1Z" />
                  <circle cx="12" cy="11.5" r="1.5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  <span>BETHLEHEM</span>
                  <span className="text-amber-400 font-black">TV</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Devotional
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Spiritual Broadcast & Daily Reflections
              </p>
            </div>
          </div>

          {/* Under Maintenance Live Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span className="text-xs font-semibold text-amber-300 tracking-wide flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              Under Maintenance
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center pt-10 sm:pt-14 pb-8">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 text-xs font-medium tracking-wide mb-6 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Scheduled Sanctuary System Upgrade</span>
          </div>

          {/* Maintenance Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.2] max-w-3xl mx-auto">
            We Are Currently{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.35)]">
              Under Maintenance
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            We are performing scheduled improvements to bring you an enriched devotional experience with daily morning reflections, live prayer streams, and uplifting media from Bethlehem TV.
          </p>

        </section>



        {/* Notification Subscription / Quick Alert */}
        <section className="my-6">
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-2xl text-center max-w-2xl mx-auto">
            {submitted ? (
              <div className="space-y-3 py-4">
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  You Will Be Notified Once We Are Back Online!
                </h3>
                <p className="text-xs text-slate-400">
                  May God bless your day with peace and joy.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
                  <Mail className="w-4 h-4" />
                  <span>Get Notified When Service Resumes</span>
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Leave your email address to receive an instant alert when our devotional hub is fully restored.
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>Notify Me</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Live Broadcast Alternate Notice */}
        <section className="mt-4 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-red-400 font-semibold">
              <Radio className="w-3.5 h-3.5" />
              Live Television Stream is Active:
            </span>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline font-medium"
            >
              Watch Bethlehem TV on YouTube →
            </a>
          </div>
        </section>
      </div>

      {/* Floating Ambient Prayer Soundscape Controls */}
      <AmbientSoundToggle />

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/80 backdrop-blur-xl py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Bethlehem TV Broadcasting Network. All rights reserved.</span>
          <span className="flex items-center gap-1 text-slate-400">
            <span>Rooted in Faith</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Serving Worldwide</span>
          </span>
        </div>
      </footer>
    </main>
  );
}
