
'use client';

import { useTheme } from '@/context/ThemeContext';
import { palettes } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function PaletteSelector() {
  const { theme, setPalette } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Color Palette</h3>
      <div className="grid grid-cols-2 gap-4">
        {palettes.map((palette) => {
          const isActive = theme.palette.name === palette.name;
          return (
            <button
              key={palette.name}
              onClick={() => setPalette(palette)}
              className={cn(
                'p-3 rounded-lg border space-y-2',
                isActive ? 'border-primary ring-2 ring-ring' : 'border-border'
              )}
            >
              <div className="flex justify-between items-center">
                 <p className="font-semibold text-sm">{palette.name}</p>
                 {isActive && <Check className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex space-x-2">
                {palette.swatches.map((color, index) => (
                  <div
                    key={index}
                    className="h-6 w-full rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
