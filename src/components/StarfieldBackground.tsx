"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    const starCount = Math.min(Math.floor((width * height) / 9000), 180);
    const starColors = [
      "255, 255, 255",     // Pure white
      "245, 158, 11",      // Warm amber gold
      "251, 191, 36",      // Radiant gold
      "199, 210, 254",     // Ethereal indigo/blue
      "253, 230, 138",     // Soft yellow gold
    ];

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const size = Math.random() * 2 + 0.6;
        const baseAlpha = Math.random() * 0.7 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          alpha: baseAlpha,
          baseAlpha,
          speed: Math.random() * 0.15 + 0.05,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
        });
      }
    };

    initStars();

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep celestial radial backdrop
      const radialGlow = ctx.createRadialGradient(
        width * 0.5 + (mouseX - width * 0.5) * 0.08,
        height * 0.35 + (mouseY - height * 0.35) * 0.08,
        50,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.8
      );
      radialGlow.addColorStop(0, "rgba(30, 27, 75, 0.4)"); // Ethereal indigo glow
      radialGlow.addColorStop(0.35, "rgba(15, 23, 42, 0.6)"); // Deep slate navy
      radialGlow.addColorStop(1, "rgba(5, 8, 17, 0.95)"); // Midnight black

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle radiant golden rays from top center
      const rayGlow = ctx.createRadialGradient(
        width * 0.5,
        -50,
        10,
        width * 0.5,
        height * 0.5,
        height * 0.9
      );
      rayGlow.addColorStop(0, "rgba(245, 158, 11, 0.12)");
      rayGlow.addColorStop(0.5, "rgba(245, 158, 11, 0.03)");
      rayGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rayGlow;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha =
          star.baseAlpha + Math.sin(star.twinklePhase) * (star.baseAlpha * 0.5);

        // Slow upward drift
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        // Parallax effect
        const parallaxX = (mouseX - width / 2) * (star.size * 0.005);
        const parallaxY = (mouseY - height / 2) * (star.size * 0.005);

        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${star.color}, ${Math.max(0, Math.min(1, currentAlpha))})`;
        ctx.fill();

        // Glow for larger golden stars
        if (star.size > 1.8) {
          ctx.beginPath();
          ctx.arc(
            star.x + parallaxX,
            star.y + parallaxY,
            star.size * 3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(${star.color}, ${currentAlpha * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
