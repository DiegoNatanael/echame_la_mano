'use client';

import React from 'react';
import { Heart, Flame, Star, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StatsBarProps {
  hearts?: number;
  maxHearts?: number;
  streak?: number;
  xp?: number;
  className?: string;
}

const StatsBar: React.FC<StatsBarProps> = ({ 
  hearts = 5, 
  maxHearts = 10, 
  streak = 0, 
  xp = 0, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Hearts */}
      <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        <span className="font-medium text-sm">{hearts}</span>
      </div>
      
      {/* Streak */}
      <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
        <Flame className="h-4 w-4 text-orange-500" />
        <span className="font-medium text-sm">{streak}</span>
      </div>
      
      {/* XP */}
      <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="font-medium text-sm">{xp}</span>
      </div>
      
      {/* Profile */}
      <Link href="/profile" className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
        <User className="h-4 w-4 text-muted-foreground" />
      </Link>
    </div>
  );
};

export { StatsBar };