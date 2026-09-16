"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, HeartHandshake, CheckCircle2, Send, Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function PrayerAndNotifyModal() {
  const [activeTab, setActiveTab] = useState<"notify" | "prayer">("notify");

  // Notification form state
  const [notifyName, setNotifyName] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  // Prayer form state
  const [prayerName, setPrayerName] = useState("");
  const [prayerEmail, setPrayerEmail] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#F59E0B", "#FBBF24", "#6366F1", "#FFFFFF"],
      });
    } catch {
      // ignore
    }
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySubmitted(true);
    triggerConfetti();
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerRequest) return;
    setPrayerSubmitted(true);
    triggerConfetti();
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab("notify")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "notify"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/5"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Launch Notification</span>
          </button>

          <button
            onClick={() => setActiveTab("prayer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "prayer"
                ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-indigo-400" />
            <span>Prayer Request Wall</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 md:p-10">
          {activeTab === "notify" ? (
            <div>
              {notifySubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    You Are On The Early Access Blessing List!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-amber-300 font-semibold">{notifyName || "beloved friend"}</span>. 
                    We will notify you the moment Bethlehem TV Devotional sanctuary goes live.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setNotifySubmitted(false);
                        setNotifyEmail("");
                        setNotifyName("");
                      }}
                      className="text-xs text-amber-400/80 hover:text-amber-300 underline"
                    >
                      Register another email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <div className="text-left mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Be First to Access Daily Devotionals
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Receive morning Scripture reflections, audio devotions, and Bethlehem TV stream schedules directly in your inbox.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={notifyName}
                        onChange={(e) => setNotifyName(e.target.value)}
                        placeholder="e.g. Brother John / Sister Mary"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Devotional Cadence
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "daily", label: "Daily Sunrise" },
                        { id: "weekly", label: "Weekly Digest" },
                        { id: "live", label: "Live TV Alerts" },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setFrequency(item.id)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                            frequency === item.id
                              ? "bg-amber-500/20 border-amber-400 text-amber-200"
                              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Notify Me On Launch</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    We respect your privacy. No spam, only spiritual encouragement.
                  </p>
                </form>
              )}
            </div>
          ) : (
            <div>
              {prayerSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto border border-indigo-500/40">
                    <Heart className="w-8 h-8 fill-indigo-400/20" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Your Prayer Request Is Received
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    &ldquo;Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.&rdquo; <br />
                    <span className="text-indigo-300 font-semibold">— Mark 11:24</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    The Bethlehem TV Pastoral & Prayer ministry team is lifting your request before the throne of grace.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setPrayerSubmitted(false);
                        setPrayerRequest("");
                      }}
                      className="text-xs text-indigo-300/80 hover:text-indigo-200 underline"
                    >
                      Submit another prayer intention
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePrayerSubmit} className="space-y-4">
                  <div className="text-left mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-indigo-400" />
                      Send A Prayer Intention
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Our intercessory prayer network in Bethlehem & worldwide prays over every submitted petition.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name (Optional / First Name)
                      </label>
                      <input
                        type="text"
                        value={prayerName}
                        onChange={(e) => setPrayerName(e.target.value)}
                        placeholder="e.g. David / Anonymous"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email (For prayer updates)
                      </label>
                      <input
                        type="email"
                        value={prayerEmail}
                        onChange={(e) => setPrayerEmail(e.target.value)}
                        placeholder="you@example.com (optional)"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Prayer Request / Thanksgiving <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={prayerRequest}
                      onChange={(e) => setPrayerRequest(e.target.value)}
                      placeholder="Share what is on your heart (Healing, Family, Guidance, Thanksgiving, Spiritual Renewal)..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="confidentialCheck"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="confidentialCheck"
                      className="text-xs text-slate-400 cursor-pointer"
                    >
                      Keep this prayer confidential with the pastoral intercessors
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Prayer Petition</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
