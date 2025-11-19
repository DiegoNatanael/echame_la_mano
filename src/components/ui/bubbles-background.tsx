"use client";

import { useEffect, useRef } from "react";

interface BubblesBackgroundProps {
  bubbleCount?: number;
  speed?: number;
  scramble?: boolean;
}

export const BubblesBackground = ({
  bubbleCount = 50,
  speed = 1,
  scramble = true,
}: BubblesBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      speedY: number;
      oscillationSpeed: number;
      oscillationDistance: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h + h; 
        // FIX 1: Made bubbles BIGGER (Range: 5px to 20px)
        this.size = Math.random() * 15 + 5; 
        this.baseX = this.x;
        this.speedY = Math.random() * speed + 0.5;
        this.oscillationSpeed = Math.random() * 0.02 + 0.005;
        this.oscillationDistance = Math.random() * 40 + 20;
        // FIX 2: Made bubbles more opaque (Range: 0.3 to 0.8)
        this.opacity = Math.random() * 0.5 + 0.3; 
      }

      update() {
        this.y -= this.speedY;
        this.x = this.baseX + Math.sin(this.y * this.oscillationSpeed) * this.oscillationDistance;

        if (scramble) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Increased interaction radius slightly for bigger bubbles
          if (distance < 150) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (150 - distance) / 150;
            
            this.x += forceDirectionX * force * 20;
            this.baseX += forceDirectionX * force * 20; 
            this.y += forceDirectionY * force * 20;
          }
        }

        if (this.y < -this.size) {
          this.y = h + this.size;
          this.x = Math.random() * w;
          this.baseX = this.x;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Shine effect
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`;
        ctx.beginPath();
        ctx.arc(this.x - this.size/3, this.y - this.size/3, this.size/4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < bubbleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    init();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bubbleCount, speed, scramble]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-b from-cyan-100 to-blue-200 dark:from-slate-900 dark:to-slate-950 transition-colors duration-500">
      {/* FIX 3: Removed 'opacity-60' so bubbles are fully bright */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Vignette stays to focus attention on center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
    </div>
  );
};