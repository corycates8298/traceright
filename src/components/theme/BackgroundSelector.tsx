'use client';

import { useTheme } from '@/context/ThemeContext';
import { solidColors, patterns } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Check, Dot } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export function BackgroundSelector() {
  const { theme, setBackgroundType, setSolidColor, setPattern, setPatternOpacity } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Background</h3>
      
      <RadioGroup
        value={theme.backgroundType}
        onValueChange={(value) => setBackgroundType(value as any)}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="bg-none" />
          <Label htmlFor="bg-none">None (Default)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="solid" id="bg-solid" />
          <Label htmlFor="bg-solid">Solid Color</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gradient" id="bg-gradient" />
          <Label htmlFor="bg-gradient">Gradient</Label>
        </div>
         <div className="flex items-center space-x-2">
          <RadioGroupItem value="pattern" id="bg-pattern" />
          <Label htmlFor="bg-pattern">Pattern</Label>
        </div>
      </RadioGroup>

      {theme.backgroundType === 'solid' && (
        <div className="space-y-2 pt-2">
            <h4 className="text-sm font-medium">Select a Color</h4>
            <div className="grid grid-cols-4 gap-2">
            {solidColors.map((color) => (
                <button
                key={color.name}
                onClick={() => setSolidColor(color)}
                className={cn('h-12 w-full rounded-lg border flex items-center justify-center', 
                    theme.solidColor.value === color.value ? 'ring-2 ring-ring' : ''
                )}
                style={{ backgroundColor: color.value }}
                >
                {theme.solidColor.value === color.value && <Check className="h-5 w-5 text-white mix-blend-difference"/>}
                </button>
            ))}
            </div>
        </div>
      )}

      {theme.backgroundType === 'pattern' && (
        <div className="space-y-4 pt-2">
            <h4 className="text-sm font-medium">Select a Pattern</h4>
             <div className="grid grid-cols-2 gap-4">
                {patterns.map((p) => {
                const isActive = theme.pattern.name === p.name;
                return (
                    <button
                    key={p.name}
                    onClick={() => setPattern(p)}
                    className={cn(
                        'p-3 rounded-lg border space-y-2 text-left h-24',
                        isActive ? 'border-primary ring-2 ring-ring' : 'border-border'
                    )}
                    >
                    <div className={cn("h-full w-full rounded-md opacity-20", p.className)} style={{backgroundColor: 'hsl(var(--muted))'}} />
                    <p className="font-semibold text-sm -mt-20 text-center">{p.name}</p>
                    </button>
                );
                })}
            </div>
            <div>
                 <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="pattern-opacity" className="text-sm font-medium">Opacity</Label>
                    <span className="text-xs font-mono text-muted-foreground">{theme.patternOpacity}%</span>
                </div>
                <Slider id="pattern-opacity" value={[theme.patternOpacity]} onValueChange={(v) => setPatternOpacity(v[0])} min={0} max={100} step={1} />
            </div>
        </div>
      )}
    </div>
  );
}
