'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import { palettes, fonts, type Palette, type Font, type Gradient, gradients } from '@/lib/theme';

type ThemeState = {
  palette: Palette;
  font: Font;
  gradient: Gradient;
};

type ThemeContextType = {
  theme: ThemeState;
  setPalette: (palette: Palette) => void;
  setFont: (font: Font) => void;
  setGradient: (gradient: Gradient) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeState>({
    palette: palettes[0],
    font: fonts[0],
    gradient: gradients[0],
  });
  const [open, setOpen] = useState(false);

  const setPalette = useCallback((palette: Palette) => {
    setTheme(prev => ({ ...prev, palette }));
    const root = document.documentElement;
    root.style.setProperty('--primary-hsl', palette.primary);
    root.style.setProperty('--primary-foreground-hsl', palette.primaryForeground);
  }, []);

  const setFont = useCallback((font: Font) => {
    setTheme(prev => ({ ...prev, font }));
    const root = document.documentElement;
    root.style.setProperty('--font-sans', font.variable);
  }, []);
  
  const setGradient = useCallback((gradient: Gradient) => {
    setTheme(prev => ({ ...prev, gradient }));
  }, []);

  const value = useMemo(() => ({
    theme,
    setPalette,
    setFont,
    setGradient,
    open,
    setOpen,
  }), [theme, setPalette, setFont, setGradient, open]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
