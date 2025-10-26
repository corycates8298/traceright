
'use client';

import { useTheme } from '@/context/ThemeContext';
import { gradients } from '@/lib/theme';
import { cn } from '@/lib/utils';

export function GradientSelector() {
  const { theme, setGradient } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Gradient Gallery</h3>
      <div className="grid grid-cols-2 gap-4">
        {gradients.map((gradient) => {
          const isActive = theme.gradient.name === gradient.name;
          return (
            <button
              key={gradient.name}
              onClick={() => setGradient(gradient)}
              className={cn(
                'p-3 rounded-lg border space-y-2 text-left',
                isActive ? 'border-primary ring-2 ring-ring' : 'border-border'
              )}
            >
              <div className="h-16 w-full rounded-md" style={{background: `linear-gradient(to right, hsl(var(--primary)), hsl(var(--background)))`}} />
              <p className="font-semibold text-sm">{gradient.name}</p>
              <p className="text-xs text-muted-foreground">{gradient.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
