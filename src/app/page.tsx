"use client";

import React, { useState, useEffect, useRef } from "react";

export default function BethlehemTVMaintenancePage() {
  // Animated scroll progress: 0 = completely closed (only BETHLEHEM TV in screen), 1 = fully open
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Track window width for responsive animation offsets
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth wheel & gesture physics to play opening animation without scrolling page down
  useEffect(() => {
    let animId: number;
    let current = 0;

    const tick = () => {
      const diff = targetProgress.current - current;
      if (Math.abs(diff) > 0.0002) {
        // Natural fluid easing
        current += diff * 0.14;
        setProgress(current);
      } else if (current !== targetProgress.current) {
        current = targetProgress.current;
        setProgress(current);
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // Capture wheel without scrolling page down
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Normalize delta across browsers
      const delta = e.deltaMode === 1 ? e.deltaY * 28 : e.deltaY;
      const sensitivity = 0.0016;
      targetProgress.current = Math.min(
        Math.max(targetProgress.current + delta * sensitivity, 0),
        1
      );
    };

    // Mobile Touch swipe support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // swipe up = open
      touchStartY = currentY;
      const touchSensitivity = 0.0035;
      targetProgress.current = Math.min(
        Math.max(targetProgress.current + deltaY * touchSensitivity, 0),
        1
      );
    };

    // Keyboard Arrow navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        targetProgress.current = Math.min(targetProgress.current + 0.35, 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        targetProgress.current = Math.max(targetProgress.current - 0.35, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Door transforms: part open to -100% and +100%
  const leftDoorTranslate = -progress * 100;
  const rightDoorTranslate = progress * 100;

  // Background visual scaling
  const imageScale = 1.12 - progress * 0.12;

  // Initial Center Wordmark transforms:
  // Dynamically adapt offset based on screen width so outer letters are never clipped on mobile
  const isMobile = windowWidth < 640;
  const shiftDistance = isMobile ? 28 : 110;
  const brandOpacity = Math.max(0, 1 - progress * 1.8);
  const bethlehemOffset = -progress * shiftDistance;
  const tvOffset = progress * shiftDistance;

  // Revealed content transforms:
  // Emerges smoothly as doors open
  const revealProgress = Math.min(Math.max((progress - 0.12) / 0.88, 0), 1);
  const revealOpacity = revealProgress;
  const revealTranslateY = (1 - revealProgress) * 22;

  // Click closed curtain to open
  const handleCurtainClick = () => {
    if (progress < 0.4) {
      targetProgress.current = 1;
    }
  };

  return (
    <main
      className="fixed inset-0 w-full h-full h-[100dvh] overflow-hidden bg-[#0A0C0E] text-[#EDE7DC] font-sora select-none flex flex-col justify-between"
      style={{ touchAction: "none" }}
    >

      {/* =========================================================================
          1. BACKGROUND VISUAL (Revealed behind the doors)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-75 ease-out"
          style={{
            backgroundImage: "url('/portal-bg.jpg')",
            transform: `scale(${imageScale})`,
          }}
        />
        {/* Subtle dark gradient treatment for high contrast */}
        <div className="absolute inset-0 bg-[#0A0C0E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-[#0A0C0E]/30 to-[#0A0C0E]/80" />
      </div>


      {/* =========================================================================
          2. FIXED BRAND HEADER
          ========================================================================= */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 sm:py-5 border-b border-[rgba(237,231,220,0.08)] bg-[#0A0C0E]/40 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="font-syne font-bold text-xs sm:text-base tracking-tight text-[#EDE7DC]">
            BETHLEHEM TV
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] inline-block" />
        </div>

        <div className="text-[9.5px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-[#9EA5A8]">
          {progress < 0.5 ? "OFFLINE" : "RELAUNCHING SOON"}
        </div>
      </header>


      {/* =========================================================================
          3. REVEALED CONTENT: "WE'RE PREPARING SOMETHING NEW"
          Fades in and rises as user scrolls to open the doors
          ========================================================================= */}
      <div
        className="relative z-20 my-auto flex flex-col items-center text-center px-4 sm:px-8 md:px-12 max-w-3xl mx-auto w-full transition-all duration-75 ease-out"
        style={{
          opacity: revealOpacity,
          transform: `translateY(${revealTranslateY}px)`,
          pointerEvents: revealOpacity > 0.4 ? "auto" : "none",
        }}
      >
        {/* Main Headline with responsive font size that fits mobile screens */}
        <h1 className="font-syne font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#EDE7DC] tracking-tight leading-[1.15] max-w-full">
          WE&apos;RE PREPARING{" "}
          <span className="text-[#E8913C]">SOMETHING NEW.</span>
        </h1>

        {/* Supporting description */}
        <p className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-[#9EA5A8] font-normal leading-relaxed max-w-lg mx-auto px-2 sm:px-0">
          Our digital space is currently being renewed. We&apos;ll be back soon with something fresh for you.
        </p>
      </div>


      {/* =========================================================================
          4. FULL-SCREEN CURTAIN DOORS (SPLITS ON SCROLL)
          ========================================================================= */}
      {progress < 1 && (
        <div
          onClick={handleCurtainClick}
          className={`absolute inset-0 z-40 overflow-hidden select-none transition-opacity duration-150 ${
            progress === 0 ? "cursor-pointer" : "pointer-events-none"
          }`}
          style={{ opacity: progress >= 0.99 ? 0 : 1 }}
        >
          {/* Left Door Panel */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#0A0C0E] border-r border-[rgba(237,231,220,0.08)] transition-transform duration-75 ease-out"
            style={{ transform: `translateX(${leftDoorTranslate}%)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C0E] via-[#0E1114] to-[#121519] opacity-98" />
          </div>

          {/* Right Door Panel */}
          <div
            className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0A0C0E] border-l border-[rgba(237,231,220,0.08)] transition-transform duration-75 ease-out"
            style={{ transform: `translateX(${rightDoorTranslate}%)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-[#0A0C0E] via-[#0E1114] to-[#121519] opacity-98" />
          </div>

          {/* Center Seam Glow Line */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 pointer-events-none transition-opacity duration-150"
            style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E8913C]/60 to-transparent animate-seam-glow" />
          </div>

          {/* Center Wordmark: ONLY BETHLEHEM | TV. in the screen before scrolling */}
          {brandOpacity > 0.01 && (
            <div
              className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 transition-opacity duration-75 ease-out pointer-events-none"
              style={{ opacity: brandOpacity }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 max-w-full">
                {/* BETHLEHEM */}
                <span
                  className="font-syne font-extrabold text-[1.25rem] xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#EDE7DC] tracking-[0.03em] sm:tracking-[0.06em] whitespace-nowrap"
                  style={{ transform: `translateX(${bethlehemOffset}px)` }}
                >
                  BETHLEHEM
                </span>

                {/* Vertical Divider Line */}
                <span
                  className="w-px h-5 sm:h-8 md:h-12 lg:h-14 bg-[#2E6B72]/70 inline-block transition-opacity duration-100 shrink-0"
                  style={{ opacity: Math.max(0, 1 - progress * 3) }}
                />

                {/* TV. */}
                <div
                  className="flex items-center whitespace-nowrap"
                  style={{ transform: `translateX(${tvOffset}px)` }}
                >
                  <span className="font-syne font-extrabold text-[1.25rem] xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#EDE7DC] tracking-[0.03em] sm:tracking-[0.06em]">
                    TV
                  </span>
                  <span className="font-syne font-extrabold text-[1.25rem] xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#E8913C] ml-0.5">
                    .
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* =========================================================================
          5. FIXED FOOTER
          ========================================================================= */}
      <footer className="relative z-30 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 border-t border-[rgba(237,231,220,0.08)] text-[9.5px] sm:text-[11px] font-normal tracking-[0.08em] text-[#6C7378]">
        <div className="flex items-center gap-1">
          <span className="font-syne font-semibold text-[#EDE7DC]">BETHLEHEM TV</span>
          <span className="text-[#E8913C]">.</span>
        </div>

        <div>
          © {new Date().getFullYear()} BETHLEHEM TV
        </div>
      </footer>

    </main>
  );
}
