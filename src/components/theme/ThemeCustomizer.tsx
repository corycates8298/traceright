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

export function ThemeCustomizer() {
  const { open, setOpen } = useTheme();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Theme Studio</SheetTitle>
          <SheetDescription>
            Customize your dashboard experience.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-100px)]">
            <div className="p-6 space-y-8">
                <FontSelector />
                <PaletteSelector />
                <GradientSelector />
                <ThemePreview />
            </div>
        </ScrollArea>
        <div className="p-6 border-t absolute bottom-0 w-full bg-background">
             <Button variant="outline" className="w-full">Reset All to Defaults</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
