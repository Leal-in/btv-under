"use client";

import React, { useState } from "react";
import { Tv, Radio, Smartphone, Globe, ExternalLink, Satellite, X, Play } from "lucide-react";

export default function BroadcastInfo() {
  const [showSatelliteModal, setShowSatelliteModal] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      {/* Live Broadcast Banner */}
      <div className="relative rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 backdrop-blur-xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-left">
          <div className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Live Broadcast On-Air
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
                24/7 STREAM
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">
              Bethlehem TV: Songs of Praise & Devotional Reflections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-all duration-200 shadow-lg shadow-red-600/20"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Watch Live Stream</span>
          </a>
          <button
            onClick={() => setShowSatelliteModal(true)}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium text-xs transition-all duration-200"
          >
            <Satellite className="w-3.5 h-3.5 text-amber-400" />
            <span>Satellite Frequencies</span>
          </button>
        </div>
      </div>

      {/* Broadcast Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              24/7 Television
            </h4>
            <p className="text-[11px] text-slate-400">Continuous Gospel Media</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Devotional Audio
            </h4>
            <p className="text-[11px] text-slate-400">Daily Morning Manna</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Mobile App
            </h4>
            <p className="text-[11px] text-slate-400">iOS & Android Coming Soon</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Global Reach
            </h4>
            <p className="text-[11px] text-slate-400">Broadcast to 140+ Nations</p>
          </div>
        </div>
      </div>

      {/* Satellite Info Modal */}
      {showSatelliteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowSatelliteModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Satellite className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Bethlehem TV Satellite Tuning
                </h3>
                <p className="text-xs text-slate-400">Free-to-Air International Broadcast Frequencies</p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between font-bold text-amber-300 mb-1">
                  <span>Nilesat 201 (Middle East & North Africa)</span>
                  <span>7.0° W</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>Freq: <span className="text-slate-200">11938 V</span></div>
                  <div>Symbol Rate: <span className="text-slate-200">27500</span></div>
                  <div>FEC: <span className="text-slate-200">5/6</span></div>
                  <div>Polarization: <span className="text-slate-200">Vertical</span></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between font-bold text-amber-300 mb-1">
                  <span>Galaxy 19 (North America)</span>
                  <span>97.0° W</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>Freq: <span className="text-slate-200">12177 V</span></div>
                  <div>Symbol Rate: <span className="text-slate-200">23000</span></div>
                  <div>FEC: <span className="text-slate-200">3/4</span></div>
                  <div>Polarization: <span className="text-slate-200">Vertical</span></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between font-bold text-amber-300 mb-1">
                  <span>Hotbird 13E (Europe & Mediterranean)</span>
                  <span>13.0° E</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>Freq: <span className="text-slate-200">11137 H</span></div>
                  <div>Symbol Rate: <span className="text-slate-200">27500</span></div>
                  <div>FEC: <span className="text-slate-200">3/4</span></div>
                  <div>Polarization: <span className="text-slate-200">Horizontal</span></div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSatelliteModal(false)}
              className="w-full mt-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Close Frequency Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
