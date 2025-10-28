
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import {
  palettes,
  fonts,
  type Palette,
  type Font,
  type Gradient,
  gradients,
  type SolidColor,
  solidColors,
  type Pattern,
  patterns,
} from '@/lib/theme';
import { hslToHex } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

type BackgroundType = 'none' | 'solid' | 'gradient' | 'pattern';

type EqualizerState = {
  angle: number;
  startPosition: number;
  endPosition: number;
  intensity: number;
  spread: number;
};

type ThemeState = {
  palette: Palette;
  font: Font;
  gradient: Gradient;
  backgroundType: BackgroundType;
  solidColor: SolidColor;
  pattern: Pattern;
  patternOpacity: number;
  equalizer: EqualizerState;
};

type ThemeContextType = {
  theme: ThemeState;
  setPalette: (palette: Palette) => void;
  setFont: (font: Font) => void;
  setGradient: (gradient: Gradient) => void;
  setBackgroundType: (type: BackgroundType) => void;
  setSolidColor: (color: SolidColor) => void;
  setPattern: (pattern: Pattern) => void;
  setPatternOpacity: (opacity: number) => void;
  setEqualizerValue: (key: keyof EqualizerState, value: number) => void;
  resetEqualizer: () => void;
  resetTheme: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultEqualizerState: EqualizerState = {
  angle: 90,
  startPosition: 0,
  endPosition: 100,
  intensity: 100,
  spread: 50,
};

const defaultThemeState: ThemeState = {
    palette: palettes[0],
    font: fonts[0],
    gradient: gradients[0],
    backgroundType: 'none',
    solidColor: solidColors[0],
    pattern: patterns[0],
    patternOpacity: 20,
    equalizer: defaultEqualizerState,
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeState>('traceright-theme', defaultThemeState);
  const [open, setOpen] = useState(false);

  const setPalette = useCallback((palette: Palette) => {
    setTheme((prev) => ({ ...prev, palette }));
  }, [setTheme]);

  const setFont = useCallback((font: Font) => {
    setTheme((prev) => ({ ...prev, font }));
  }, [setTheme]);

  const setGradient = useCallback((gradient: Gradient) => {
    setTheme((prev) => ({ ...prev, gradient }));
  }, [setTheme]);

  const setBackgroundType = useCallback((type: BackgroundType) => {
    setTheme((prev) => ({ ...prev, backgroundType: type }));
  }, [setTheme]);

  const setSolidColor = useCallback((color: SolidColor) => {
    setTheme((prev) => ({ ...prev, solidColor: color }));
  }, [setTheme]);

  const setPattern = useCallback((pattern: Pattern) => {
    setTheme((prev) => ({ ...prev, pattern }));
  }, [setTheme]);

  const setPatternOpacity = useCallback((opacity: number) => {
    setTheme((prev) => ({ ...prev, patternOpacity: opacity }));
  }, [setTheme]);

  const setEqualizerValue = useCallback(
    (key: keyof EqualizerState, value: number) => {
      setTheme((prev) => ({
        ...prev,
        equalizer: { ...prev.equalizer, [key]: value },
      }));
    },
    [setTheme]
  );

  const resetEqualizer = useCallback(() => {
    setTheme((prev) => ({
      ...prev,
      equalizer: defaultEqualizerState,
    }));
  }, [setTheme]);

  const resetTheme = useCallback(() => {
      setTheme(defaultThemeState);
  }, [setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply Palette
    root.style.setProperty('--primary', theme.palette.primary);
    root.style.setProperty('--primary-foreground', theme.palette.primaryForeground);

    // Apply Font
    document.body.classList.remove(...fonts.map(f => f.className));
    document.body.classList.add(theme.font.className);

    // Apply Background
    let backgroundStyle = '';
    const baseBackgroundColor = `hsl(var(--background))`;
    
    // Always clear pattern classes first
    body.className = body.className.split(' ').filter(c => !c.startsWith('pattern-')).join(' ');
    body.style.setProperty('--pattern-opacity', '0');


    switch (theme.backgroundType) {
      case 'solid':
        backgroundStyle = theme.solidColor.value;
        break;
      case 'gradient':
        const primaryColor = hslToHex(theme.palette.primary);
        const { angle, startPosition, endPosition, intensity } = theme.equalizer;
        const transparentColor = 'rgba(0,0,0,0)';
        
        const primaryColorWithIntensity = `rgba(${parseInt(primaryColor.slice(1,3), 16)}, ${parseInt(primaryColor.slice(3,5), 16)}, ${parseInt(primaryColor.slice(5,7), 16)}, ${intensity / 100})`;

        let gradientValue = '';
        switch (theme.gradient.name) {
          case 'Linear':
          case 'Diagonal':
            const effectiveAngle = theme.gradient.name === 'Diagonal' ? angle + 45 : angle;
            gradientValue = `linear-gradient(${effectiveAngle}deg, ${primaryColorWithIntensity} ${startPosition}%, ${transparentColor} ${endPosition}%)`;
            break;
          case 'Radial':
            gradientValue = `radial-gradient(circle, ${primaryColorWithIntensity} ${startPosition}%, ${transparentColor} ${endPosition}%)`;
            break;
          case 'Conic':
             gradientValue = `conic-gradient(from ${angle}deg, ${primaryColorWithIntensity} ${startPosition}%, ${transparentColor} ${endPosition}%)`;
            break;
        }
        // Layer the gradient on top of the base background color
        backgroundStyle = `${gradientValue}, ${baseBackgroundColor}`;
        break;
      case 'pattern':
        body.classList.add(`pattern-${theme.pattern.name.toLowerCase()}`);
        body.style.setProperty('--pattern-opacity', `${theme.patternOpacity / 100}`);
        backgroundStyle = `var(--pattern-bg)`;
        break;
      case 'none':
      default:
        backgroundStyle = baseBackgroundColor;
        break;
    }
    
    body.style.background = backgroundStyle;

  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setPalette,
      setFont,
      setGradient,
      setBackgroundType,
      setSolidColor,
      setPattern,
      setPatternOpacity,
      setEqualizerValue,
      resetEqualizer,
      resetTheme,
      open,
      setOpen,
    }),
    [
      theme,
      setPalette,
      setFont,
      setGradient,
      setBackgroundType,
      setSolidColor,
      setPattern,
      setPatternOpacity,
      setEqualizerValue,
      resetEqualizer,
      resetTheme,
      open,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
