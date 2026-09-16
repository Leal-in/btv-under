"use client";

import React from "react";
import { Sunrise, Video, HeartPulse, Compass, Headphones, Sparkles } from "lucide-react";

export default function UpcomingFeatures() {
  const features = [
    {
      icon: Sunrise,
      title: "Daily Morning Manna",
      desc: "Bite-sized audio reflections and theological commentary to begin every morning anchored in the Word.",
      tag: "Daily 6:00 AM",
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
      iconColor: "text-amber-400",
    },
    {
      icon: Video,
      title: "Holy Land Live Cam & Teachings",
      desc: "Direct virtual streams from sacred biblical sites across Bethlehem, Jerusalem, and Galilee.",
      tag: "Live & On-Demand",
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      icon: Headphones,
      title: "Guided Prayer & Worship Audio",
      desc: "Immersive audio soundscapes, Psalms of David acoustic readings, and serene Christian meditation.",
      tag: "Audio Sanctuary",
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      icon: HeartPulse,
      title: "Interactive Intercessory Wall",
      desc: "Global prayer wall connecting believers across 140+ countries to stand in the gap for one another.",
      tag: "Community Faith",
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>What We Are Building For You</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          A Sanctuary For Daily Spiritual Renewal
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2">
          Designed with devotion and modern technology to keep you continuously connected to the living Word.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${item.color} bg-slate-900/60 border ${item.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group text-left`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className={`p-3 rounded-xl bg-slate-950/60 border border-white/10 ${item.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-950/60 text-slate-300 border border-white/10">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
