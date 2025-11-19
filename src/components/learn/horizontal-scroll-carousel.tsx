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
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pin = sectionRef.current;
    const trigger = triggerRef.current;
    const progress = progressBarRef.current;

    if (!pin || !trigger) return;

    const scrollWidth = pin.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 80px", 
        
        end: () => `+=${scrollWidth + 1000}`,
        scrub: 1,
        pin: true,
        // FIX 2: Remove pinning spacing issues if they occur
        pinSpacing: true,
        invalidateOnRefresh: true,
      }
    });

    tl.to(pin, {
      x: -scrollWidth,
      ease: "none",
    });

    gsap.to(progress, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        // Match the start position here too
        start: "top 80px",
        end: () => `+=${scrollWidth + 1000}`,
        scrub: 0,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, { scope: triggerRef });

  return (
    <div className="relative">
      {/* FIX 3: Change h-screen to calc(100vh - 80px) 
          This ensures the container fits perfectly in the space BELOW the header 
          without pushing the page content too far down. 
      */}
      <div 
        ref={triggerRef} 
        className="h-[calc(100vh-80px)] overflow-hidden bg-background relative flex flex-col"
      >
        
        {/* Centered Title Section */}
        <div className="absolute top-12 left-0 w-full z-10 pointer-events-none flex flex-col items-center justify-center px-4">
          {title && (
            <h2 className="text-4xl font-bold text-foreground mb-2 drop-shadow-sm text-center">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-lg text-center max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* The Horizontal Strip */}
        <div 
          ref={sectionRef} 
          className="flex flex-row h-full items-center px-12 gap-12 w-max pt-20"
        >
          {React.Children.map(children, (child, index) => (
            <div 
              key={index} 
              className="relative w-[85vw] md:w-[600px] h-[60vh] md:h-[70vh] flex-shrink-0 transform transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="w-full h-full">
                {child}
              </div>
            </div>
          ))}
          
          <div className="w-20 h-full flex-shrink-0" />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-muted">
          <div 
            ref={progressBarRef} 
            className="h-full bg-primary w-0" 
          />
        </div>
      </div>
    </div>
  );
}