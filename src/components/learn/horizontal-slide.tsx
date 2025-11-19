'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Heart, Flame } from 'lucide-react';

interface HorizontalSlideProps {
  title: string;
  subtitle?: string;
  content: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  stats?: {
    xp?: number;
    hearts?: number;
    streak?: number;
  };
}

const HorizontalSlide: React.FC<HorizontalSlideProps> = ({
  title,
  subtitle,
  content,
  onNext,
  onPrev,
  hasNext = true,
  hasPrev = true,
  stats
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Stats bar - will be replaced by navbar in final implementation */}
      {stats && (
        <div className="absolute top-4 right-4 flex gap-4 z-10">
          {stats.xp !== undefined && (
            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{stats.xp}</span>
            </div>
          )}
          {stats.hearts !== undefined && (
            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-medium">{stats.hearts}</span>
            </div>
          )}
          {stats.streak !== undefined && (
            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium">{stats.streak}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl bg-card">
          <CardHeader>
            <CardTitle className="text-3xl text-center">{title}</CardTitle>
            {subtitle && <p className="text-center text-muted-foreground">{subtitle}</p>}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-lg">
              {content}
            </div>
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={onPrev} 
                disabled={!hasPrev}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button 
                onClick={onNext} 
                disabled={!hasNext}
                className="flex items-center gap-2"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { HorizontalSlide };