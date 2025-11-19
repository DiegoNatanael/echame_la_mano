'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

interface HorizontalScrollSectionProps {
  children: React.ReactNode[];
}

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set up horizontal scrolling
    const slides = containerRef.current.querySelectorAll('.slide');
    const slidesContainer = containerRef.current.querySelector('.slides-container');
    
    if (!slidesContainer || slides.length === 0) return;
    
    const scrollDistance = (slides.length - 1) * window.innerWidth;

    // Pin the horizontal section and set up horizontal scrolling
    gsap.set(slides, { xPercent: -100 });
    
    gsap.to(slidesContainer, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });
    
    // Refresh ScrollTrigger on window resize
    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [] });

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="horizontal-section w-full h-screen overflow-hidden bg-background">
        <div className="slides-container w-full h-full">
          <div className="slide w-full h-full flex-shrink-0 bg-card">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="horizontal-section w-full h-screen overflow-hidden relative"
    >
      <div className="slides-container w-full h-full relative">
        {children.map((child, index) => (
          <div 
            key={index} 
            className="slide w-full h-full flex-shrink-0 bg-card"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export { HorizontalScrollSection };