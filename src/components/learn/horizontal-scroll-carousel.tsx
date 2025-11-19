'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollCarouselProps {
  children: React.ReactNode[];
  title?: string;
  subtitle?: string;
}

export function HorizontalScrollCarousel({ children, title, subtitle }: ScrollCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null); // The long strip moving left
  const triggerRef = useRef<HTMLDivElement>(null); // The fixed window we look through
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const strip = sectionRef.current;
    const wrapper = triggerRef.current;
    const progress = progressBarRef.current;

    if (!strip || !wrapper || !progress) return;

    // FIX: Correct Math
    // We want to move the strip left by [Total Length] - [Screen Width]
    // This ensures the right edge of the strip stops exactly at the right edge of the screen.
    const scrollAmount = -(strip.scrollWidth - window.innerWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80px",
        // We increase the scroll distance slightly (+1000) to make it feel slower/smoother
        end: () => `+=${Math.abs(scrollAmount) + 1000}`, 
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    // 1. Move the content left
    tl.to(strip, {
      x: scrollAmount,
      ease: "none",
    });

    // 2. Fill the progress bar (Synced perfectly)
    tl.to(progress, {
      width: "100%",
      ease: "none",
    }, "<"); // The "<" syncs this start time with the previous animation

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, { scope: triggerRef });

  return (
    <div className="relative">
      {/* The "Window" / Wrapper */}
      <div 
        ref={triggerRef} 
        className="h-[calc(100vh-80px)] overflow-hidden bg-transparent relative flex flex-col"
      >
        
        {/* Header Text */}
        <div className="absolute top-8 md:top-12 left-0 w-full z-10 pointer-events-none flex flex-col items-center justify-center px-4">
          {title && (
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-2 drop-shadow-sm text-center">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg text-center max-w-2xl font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* The Moving Strip */}
        <div 
          ref={sectionRef} 
          className="flex flex-row h-full items-center px-4 md:px-12 gap-8 md:gap-12 w-max pt-16 md:pt-20"
        >
          {React.Children.map(children, (child, index) => (
            <div 
              key={index} 
              className="relative w-[85vw] md:w-[600px] h-[55vh] md:h-[65vh] flex-shrink-0 transform transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="w-full h-full">
                {child}
              </div>
            </div>
          ))}
          
          {/* Spacer to ensure last card isn't cut off */}
          <div className="w-8 md:w-20 h-full flex-shrink-0" />
        </div>

        {/* Progress Bar Container */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm">
          {/* The Bar itself */}
          <div 
            ref={progressBarRef} 
            className="h-full bg-primary w-0 shadow-[0_0_10px_rgba(0,0,0,0.2)]" 
          />
        </div>

      </div>
    </div>
  );
}