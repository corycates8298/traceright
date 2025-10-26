
'use client';

import { useTheme } from '@/context/ThemeContext';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type EqualizerControl = {
  id: 'angle' | 'startPosition' | 'endPosition' | 'intensity' | 'spread';
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
};

const controls: EqualizerControl[] = [
  { id: 'angle', label: 'Angle / Direction', min: 0, max: 360, step: 1, unit: '°' },
  { id: 'startPosition', label: 'Start Position', min: 0, max: 100, step: 1, unit: '%' },
  { id: 'endPosition', label: 'End Position', min: 0, max: 100, step: 1, unit: '%' },
  { id: 'intensity', label: 'Intensity', min: 0, max: 100, step: 1, unit: '%' },
  { id: 'spread', label: 'Spread', min: 0, max: 100, step: 1, unit: '%' },
];

export function GradientEqualizer() {
  const { theme, setEqualizerValue } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Gradient Equalizer</h3>
      <div className="space-y-6 rounded-lg border p-4">
        {controls.map((control) => (
          <div key={control.id} className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={control.id}>{control.label}</Label>
              <span className="text-xs font-mono text-muted-foreground">
                {theme.equalizer[control.id]}
                {control.unit}
              </span>
            </div>
            <Slider
              id={control.id}
              value={[theme.equalizer[control.id]]}
              onValueChange={(value) => setEqualizerValue(control.id, value[0])}
              min={control.min}
              max={control.max}
              step={control.step}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
