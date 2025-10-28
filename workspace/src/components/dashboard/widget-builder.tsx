
'use client';

import React from 'react';
import type { WidgetConfig, WidgetType } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';

interface WidgetBuilderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setWidgets: React.Dispatch<React.SetStateAction<WidgetConfig[]>>;
}

const availableWidgets: { type: WidgetType; name: string, defaultWidth: number }[] = [
    { type: 'kpi-card', name: 'KPI Card', defaultWidth: 1 },
    { type: 'revenue-chart', name: 'Revenue Chart', defaultWidth: 2 },
    { type: 'order-status-chart', name: 'Order Status Chart', defaultWidth: 1 },
    { type: 'warehouse-utilization', name: 'Warehouse Utilization', defaultWidth: 2 },
    { type: 'recent-activity', name: 'Recent Activity', defaultWidth: 1 },
];


export function WidgetBuilder({
  isOpen,
  setIsOpen,
  setWidgets,
}: WidgetBuilderProps) {
  const addWidget = (type: WidgetType, defaultWidth: number) => {
    const newWidget: WidgetConfig = {
      id: `${type}-${Date.now()}`,
      type: type,
      title: 'New Widget',
      gridConfig: {
        w: defaultWidth,
        h: type.includes('chart') ? 2 : 1, // Charts are taller
        x: 0, // Will be determined by grid layout
        y: 0,
      },
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Dashboard Widget Builder</SheetTitle>
          <SheetDescription>
            Click a widget from the catalog to add it to your dashboard.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
            <div className="p-6 space-y-4">
                <h4 className="font-semibold text-sm">Widget Catalog</h4>
                <div className="grid grid-cols-2 gap-4">
                    {availableWidgets.map(widget => (
                        <Card key={widget.type} className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                             <div className="w-full h-16 bg-muted rounded-md flex items-center justify-center">
                                <p className="text-xs text-muted-foreground">{widget.name}</p>
                            </div>
                            <Button size="sm" className="w-full" onClick={() => addWidget(widget.type, widget.defaultWidth)}>
                                <Plus className="mr-2 h-4 w-4" /> Add
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
            <Separator />
             <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Current Layout</h4>
                    <Button variant="destructive" size="sm" onClick={() => setWidgets([])}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear All
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Widgets are automatically saved to this browser.
                </p>
             </div>
        </ScrollArea>
        <SheetFooter className="p-6 border-t">
            <SheetClose asChild>
                <Button className="w-full">Done</Button>
            </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
