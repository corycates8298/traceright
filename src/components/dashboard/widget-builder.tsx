'use client';

import React from 'react';
import type { WidgetConfig } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '../ui/button';

interface WidgetBuilderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  widgets: WidgetConfig[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetConfig[]>>;
}

export function WidgetBuilder({
  isOpen,
  setIsOpen,
  widgets,
  setWidgets,
}: WidgetBuilderProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Dashboard Widget Builder</SheetTitle>
          <SheetDescription>
            Add, remove, and configure widgets for your custom dashboard.
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
            <div className="flex items-center justify-center h-[60vh] border-2 border-dashed rounded-lg">
                <div className="text-center">
                    <h3 className="text-xl font-bold tracking-tight">
                        Widget Builder Coming Soon
                    </h3>
                    <p className="text-muted-foreground">
                        This panel will allow you to customize your dashboard.
                    </p>
                </div>
            </div>
        </div>
        <SheetFooter className="p-6 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button>Save Dashboard</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
