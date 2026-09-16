"use client";

import React from "react";
import { Sparkles, Radio, Tv } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
      {/* Brand Emblem & Name */}
      <div className="flex items-center gap-3">
        <div className="relative group cursor-pointer">
          {/* Radiant Glow Behind Logo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-2xl blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />
          
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950 to-slate-950 border border-amber-400/60 flex items-center justify-center shadow-lg">
            {/* Bethlehem 8-point Star SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
              fill="currentColor"
            >
              {/* Star of Bethlehem with elongated vertical beam */}
              <path d="M12 1L13.8 8.2L21 9L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9L10.2 8.2L12 1Z" />
              <circle cx="12" cy="11.5" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>BETHLEHEM</span>
              <span className="text-amber-400 font-black">TV</span>
            </h1>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Devotional Hub
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 tracking-wider uppercase font-medium">
            Voice of Faith • Reaching Every Heart
          </p>
        </div>
      </div>

      {/* Under Construction Status Pill */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="text-[11px] font-semibold text-amber-300 tracking-wide">
            Sanctuary Under Construction
          </span>
        </div>
      </div>
    </header>
  );
}
