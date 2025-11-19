// Official Ajolote Color Palette for Échame la Mano App
export const ajolotePalette = {
  // Brand Core Colors
  ajolotePink: '#F7A9B4',
  ajoloteDeepPink: '#D85277',
  sombreroYellow: '#F5C242',
  sombreroGreen: '#4BAE4F',
  sombreroRed: '#E04C3B',
  bubbleBlue: '#AEE6FF',
  skyBlue: '#8FDCFF',
  deepOutline: '#2A2A2A',
  
  // UI Colors
  neutralLight: '#F9FAFB',
  neutralGray: '#A3A3A3',
  neutralDark: '#1F2937',
  xpGold: '#F4B93A',
  lifeRed: '#FF5A5F',
  streakOrange: '#FF8C42',
  
  // Gradients
  ajoloteSoftGradient: {
    start: '#F7A9B4',
    end: '#D85277',
  },
  skyBubbleGradient: {
    start: '#AEE6FF',
    end: '#8FDCFF',
  },
} as const;

// Type definitions for the palette
export type AjoloteColor = keyof typeof ajolotePalette;