"use client";

import React, { useState } from "react";
import { BookOpen, RefreshCw, Copy, Check, Bell, Share2, Sparkles } from "lucide-react";

interface Scripture {
  text: string;
  reference: string;
  theme: string;
  reflection: string;
}

const SCRIPTURES: Scripture[] = [
  {
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Divine Hope & Future",
    reflection: "Trust in God's purposeful timing. Every step of your journey is held in His grace.",
  },
  {
    text: "Those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
    theme: "Renewed Strength",
    reflection: "When your own strength feels exhausted, divine power is made perfect in your waiting.",
  },
  {
    text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    theme: "Rest & Refreshment",
    reflection: "Breathe in heavenly tranquility. The Shepherd is guiding your every step with gentle care.",
  },
  {
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reference: "John 14:27",
    theme: "Supernatural Peace",
    reflection: "Christ's peace surpasses circumstances. Let His stillness quiet every anxiety today.",
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Guidance & Faith",
    reflection: "Surrender your uncertainties to the Creator who illuminates even the darkest paths.",
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "Providential Grace",
    reflection: "Nothing in your life is wasted. God weaves every moment into a testimony of His glory.",
  },
  {
    text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
    reference: "Numbers 6:24-26",
    theme: "Aaronic Blessing",
    reflection: "Receive the radiant favor and loving warmth of God shining upon your family today.",
  },
];

export default function DailyScripture() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const currentScripture = SCRIPTURES[currentIndex];

  const handleNextVerse = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SCRIPTURES.length);
      setIsRotating(false);
    }, 200);
  };

  const handleCopy = () => {
    const textToCopy = `"${currentScripture.text}" — ${currentScripture.reference} (Bethlehem TV Devotional)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      // Soft bell chime (E5 & B5 harmonics)
      const frequencies = [659.25, 987.77, 1318.51];
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const startTime = ctx.currentTime + i * 0.04;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12 / (i + 1), startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 3.2);
      });
    } catch {
      // Audio not permitted or supported
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Daily Bread — Bethlehem TV",
        text: `"${currentScripture.text}" — ${currentScripture.reference}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-amber-950/20 border border-amber-500/30 backdrop-blur-2xl shadow-2xl overflow-hidden group">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                Daily Word of Grace
              </span>
              <span className="block text-xs text-slate-400">
                {currentScripture.theme}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleChime}
              title="Play peaceful reflection chime"
              className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share this scripture"
              className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              title="Copy scripture to clipboard"
              className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Verse Content with Animated Transition */}
        <div
          className={`transition-all duration-300 ${
            isRotating ? "opacity-20 scale-[0.98] blur-xs" : "opacity-100 scale-100 blur-none"
          }`}
        >
          <blockquote className="text-lg sm:text-xl md:text-2xl font-serif leading-relaxed text-slate-100 italic tracking-wide">
            &ldquo;{currentScripture.text}&rdquo;
          </blockquote>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-amber-400/60" />
              <span className="text-sm sm:text-base font-semibold text-amber-300 tracking-wide">
                {currentScripture.reference}
              </span>
            </div>

            {/* Reflection capsule */}
            <div className="text-xs text-slate-300/90 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{currentScripture.reflection}</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Verse {currentIndex + 1} of {SCRIPTURES.length} • Updated Daily
          </span>

          <button
            onClick={handleNextVerse}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 hover:text-white hover:from-amber-500 hover:to-amber-600 transition-all duration-300 text-xs font-semibold shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
            <span>Next Verse of Faith</span>
          </button>
        </div>
      </div>
    </div>
  );
}
