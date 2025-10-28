'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FeaturesContextType {
  showcaseEnabled: boolean;
  setShowcaseEnabled: (enabled: boolean) => void;
}

const FeaturesContext = createContext<FeaturesContextType | undefined>(undefined);

export function FeaturesProvider({ children }: { children: ReactNode }) {
  const [showcaseEnabled, setShowcaseEnabledState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('showcase-enabled');
    if (stored !== null) {
      setShowcaseEnabledState(stored === 'true');
    }
  }, []);

  // Save to localStorage when changed
  const setShowcaseEnabled = (enabled: boolean) => {
    setShowcaseEnabledState(enabled);
    localStorage.setItem('showcase-enabled', enabled.toString());
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <FeaturesContext.Provider value={{ showcaseEnabled, setShowcaseEnabled }}>
      {children}
    </FeaturesContext.Provider>
  );
}

export function useFeatures() {
  const context = useContext(FeaturesContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
}
