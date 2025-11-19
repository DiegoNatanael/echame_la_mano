'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Trophy, Star, Heart, X } from 'lucide-react'; 
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface AchievementToastProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  themeColor?: string;
  isVisible: boolean;
  onClose: () => void;
}

const AchievementToast = ({ 
  title, 
  description, 
  icon, 
  themeColor = 'var(--primary)', 
  isVisible, 
  onClose 
}: AchievementToastProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Internal state to keep component in DOM while animating out
  // 2. GSAP Animation Logic
  const { contextSafe } = useGSAP({ scope: containerRef });

  const animateIn = contextSafe(() => {
    gsap.fromTo(containerRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  });

  const animateOut = contextSafe(() => {
    gsap.to(containerRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        onClose();
      }
    });
  });

  // 3. Lifecycle Management
  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Reset the starting position and opacity for animation
      gsap.set(containerRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8
      });

      // Animate In
      animateIn();

      // Auto-close timer (5 seconds)
      const timer = setTimeout(() => {
        animateOut();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, animateIn, animateOut]);

  const getIcon = () => {
    if (icon) return icon;
    
    const titleLower = title.toLowerCase();
    if (titleLower.includes('streak') || titleLower.includes('racha') || titleLower.includes('día')) {
      return <Trophy className="h-8 w-8 text-yellow-500" />;
    }
    if (titleLower.includes('xp') || titleLower.includes('experiencia')) {
      return <Star className="h-8 w-8 text-yellow-500" />;
    }
    if (titleLower.includes('corazón') || titleLower.includes('vida')) {
      return <Heart className="h-8 w-8 text-red-500" />;
    }
    return <CheckCircle className="h-8 w-8 text-green-500" />;
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed bottom-4 right-4 z-[100] w-full max-w-sm rounded-xl border bg-background p-4 shadow-lg',
        'border-accent'
      )}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: themeColor,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon Container */}
        <div 
          className="rounded-full bg-accent p-2 flex-shrink-0" 
          style={{ backgroundColor: themeColor + '20', borderColor: themeColor }}
        >
          {getIcon()}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 
            className="font-semibold text-foreground"
            style={{ color: themeColor }} // Changed to use themeColor directly for text
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            if (containerRef.current) {
              animateOut();
            }
          }}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export { AchievementToast };