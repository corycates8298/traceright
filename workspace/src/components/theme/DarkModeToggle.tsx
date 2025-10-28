'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'true' || (stored === null && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    localStorage.setItem('dark-mode', newValue.toString());

    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="h-9 w-9 relative overflow-hidden"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* macOS-style animated icon transition */}
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 rotate-0 scale-100 transition-all ${
            isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all ${
            isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
          }`}
        />
      </div>
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
