"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Music } from "lucide-react";

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio ambient synthesizer
  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Gentle low pass filter for warm celestial sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(380, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);
      filter.connect(masterGain);

      // Chords frequencies (F major / D minor heavenly voicing: F3, A3, C4, E4, A4)
      const chordFrequencies = [174.61, 220.0, 261.63, 329.63, 440.0, 523.25];

      oscillatorsRef.current = [];

      chordFrequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Slight detune for lush chorus effect
        osc.type = index % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime);

        const baseGain = 0.08 / (index + 1);
        oscGain.gain.setValueAtTime(baseGain, ctx.currentTime);

        // LFO for breathing swell
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + index * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(baseGain * 0.4, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();

        oscillatorsRef.current.push(osc);
      });

      setIsPlaying(true);
      setHasInteracted(true);
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0.0001,
        audioCtxRef.current.currentTime + 1.5
      );
      setTimeout(() => {
        try {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        } catch {
          // ignore
        }
      }, 1600);
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current && isPlaying) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        volume * 0.15,
        audioCtxRef.current.currentTime + 0.2
      );
    }
  }, [volume, isPlaying]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <div className="relative group">
        <button
          onClick={toggleSound}
          title={isPlaying ? "Mute ambient prayer music" : "Play ambient prayer music"}
          className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-xl text-xs font-medium tracking-wide transition-all duration-300 shadow-xl ${
            isPlaying
              ? "bg-amber-500/20 border-amber-400/40 text-amber-200 shadow-amber-500/20"
              : "bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-amber-200 hover:border-amber-400/30"
          }`}
        >
          {isPlaying ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">Ambient Sanctuary</span>
              <Music className="w-3.5 h-3.5 text-amber-400/70" />
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Serene Soundscape</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400/50" />
            </>
          )}
        </button>

        {/* Volume popup slider on hover when playing */}
        {isPlaying && (
          <div className="absolute bottom-full right-0 mb-2 p-3 bg-slate-900/90 border border-slate-700/60 backdrop-blur-xl rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto flex flex-col items-center gap-2 min-w-[120px]">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Volume
            </span>
            <input
              type="range"
              min="0.05"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-amber-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
