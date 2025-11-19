'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trophy, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Auto-close when unmounting
  useEffect(() => {
    if (!isMounted) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Match the exit animation duration
    }
  }, [isMounted, onClose]);

  const getIcon = () => {
    if (icon) return icon;
    
    // Default icons based on common achievement types
    if (title.toLowerCase().includes('streak') || title.toLowerCase().includes('día')) {
      return <Trophy className="h-8 w-8 text-yellow-500" />;
    }
    if (title.toLowerCase().includes('xp') || title.toLowerCase().includes('experiencia')) {
      return <Star className="h-8 w-8 text-yellow-500" />;
    }
    if (title.toLowerCase().includes('corazón') || title.toLowerCase().includes('vida')) {
      return <Heart className="h-8 w-8 text-red-500" />;
    }
    return <CheckCircle className="h-8 w-8 text-green-500" />;
  };

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={cn(
            'fixed bottom-4 right-4 z-[100] w-full max-w-sm rounded-xl border bg-background p-4 shadow-lg',
            'border-accent'
          )}
          style={{ backgroundColor: 'var(--card)', borderColor: themeColor }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="rounded-full bg-accent p-2" 
              style={{ backgroundColor: themeColor + '20', borderColor: themeColor }}
            >
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="font-semibold text-foreground"
                style={{ color: 'var(--primary)' }}
              >
                {title}
              </h3>
              <p 
                className="text-sm text-muted-foreground"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {description}
              </p>
            </div>
            <button
              onClick={() => {
                setIsMounted(false);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { AchievementToast };