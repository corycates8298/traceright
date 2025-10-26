'use client';

import { useTheme } from '@/context/ThemeContext';
import { fonts } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function FontSelector() {
  const { theme, setFont } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Font Family</h3>
      <div className="space-y-3">
        {fonts.map((font) => {
          const isActive = theme.font.name === font.name;
          return (
            <button
              key={font.name}
              onClick={() => setFont(font)}
              className={cn(
                'w-full text-left p-3 rounded-lg border flex justify-between items-center',
                isActive ? 'border-primary' : 'border-border'
              )}
            >
              <div>
                <p className={cn('font-semibold', font.className)}>{font.name}</p>
                <p className={cn('text-sm text-muted-foreground', font.className)}>
                  The quick brown fox jumps
                </p>
              </div>
              {isActive && <Check className="h-5 w-5 text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
