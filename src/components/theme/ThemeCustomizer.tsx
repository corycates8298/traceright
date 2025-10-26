'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useTheme } from '@/context/ThemeContext';
import { FontSelector } from './FontSelector';
import { PaletteSelector } from './PaletteSelector';
import { GradientSelector } from './GradientSelector';
import { ThemePreview } from './ThemePreview';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { GradientEqualizer } from './GradientEqualizer';
import { BackgroundSelector } from './BackgroundSelector';

export function ThemeCustomizer() {
  const { open, setOpen, resetEqualizer } = useTheme();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-background">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Theme Studio</SheetTitle>
          <SheetDescription>
            Customize your dashboard experience.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-140px)]">
            <div className="p-6 space-y-8">
                <FontSelector />
                <PaletteSelector />
                <GradientSelector />
                <GradientEqualizer />
                <BackgroundSelector />
                <ThemePreview />
            </div>
        </ScrollArea>
        <div className="p-6 border-t absolute bottom-0 w-full bg-background space-y-2">
             <Button onClick={resetEqualizer} variant="secondary" className="w-full">Reset Equalizer</Button>
             <Button variant="outline" className="w-full">Reset All to Defaults</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
