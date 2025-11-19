'use client';

import React, { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { HorizontalScrollSection } from '@/components/learn/horizontal-scroll-section';
import { HorizontalSlide } from '@/components/learn/horizontal-slide';
import { AchievementToast } from '@/components/gamification/achievement-toast';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Heart, Flame } from 'lucide-react';

const LSMTestPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(3);
  const [xp, setXp] = useState(150);

  const triggerAchievement = () => {
    setShowToast(true);
  };

  const handleSlideNext = () => {
    // Example of updating stats when moving to next slide
    setXp(prev => prev + 10);
    if (streak < 5) {
      setStreak(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Notification toast for achievements */}
      <AchievementToast
        title="¡Nuevo logro desbloqueado!"
        description="Completaste una lección difícil"
        icon={<Trophy className="h-8 w-8 text-yellow-500" />}
        themeColor="var(--primary)"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Main content */}
      <main className="pb-20">
        <HorizontalScrollSection>
          <HorizontalSlide
            title="Bienvenido a LSM"
            subtitle="Aprende jugando"
            content="Esta es una aplicación de aprendizaje estilo Duolingo. ¡Diviértete mientras aprendes!"
            onNext={handleSlideNext}
            hasNext={true}
            hasPrev={false}
            stats={{ xp, hearts, streak }}
          />
          
          <HorizontalSlide
            title="Lección 1: Saludos"
            subtitle="Aprende saludos básicos"
            content="En esta lección aprenderás los saludos básicos en el idioma que estás estudiando."
            onNext={handleSlideNext}
            onPrev={() => {}}
            hasNext={true}
            hasPrev={true}
            stats={{ xp, hearts, streak }}
          />
          
          <HorizontalSlide
            title="Lección 2: Números"
            subtitle="Aprende los números del 1 al 10"
            content="Practica los números básicos con ejercicios interactivos."
            onNext={handleSlideNext}
            onPrev={() => {}}
            hasNext={true}
            hasPrev={true}
            stats={{ xp, hearts, streak }}
          />
          
          <HorizontalSlide
            title="Lección 3: Colores"
            subtitle="Aprende los colores básicos"
            content="Reconoce y nombra los colores en el idioma extranjero."
            onNext={handleSlideNext}
            onPrev={() => {}}
            hasNext={false}
            hasPrev={true}
            stats={{ xp, hearts, streak }}
          />
        </HorizontalScrollSection>
      </main>

      {/* Fixed stats bar at the bottom for testing */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={triggerAchievement}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Star className="h-4 w-4" />
          Probar Logro
        </Button>
      </div>
    </div>
  );
};

// Wrap the component with a layout that includes the header
const LSMTestPageWithLayout = () => {
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(3);
  const [xp, setXp] = useState(150);

  return (
    <>
      <AppHeader hearts={hearts} maxHearts={10} streak={streak} xp={xp} />
      <LSMTestPage />
    </>
  );
};

export default LSMTestPageWithLayout;