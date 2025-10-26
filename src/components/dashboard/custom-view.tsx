
'use client';

import React from 'react';
import type { WidgetConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CustomDashboardViewProps {
  widgets: WidgetConfig[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetConfig[]>>;
}

export default function CustomDashboardView({
  widgets,
  setWidgets,
}: CustomDashboardViewProps) {
  if (widgets.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] border-2 border-dashed rounded-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Your Dashboard is Empty
          </h3>
          <p className="text-muted-foreground mb-4">
            Add widgets to build your custom view.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add First Widget
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className="bg-card rounded-lg border shadow-sm p-4"
          style={{ gridColumn: `span ${widget.gridConfig.w}` }}
        >
          <h4 className="font-semibold mb-2">{widget.title}</h4>
          <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
            {widget.type} widget placeholder
          </div>
        </div>
      ))}
    </div>
  );
}
