
'use client';

import React from 'react';
import type { WidgetConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import KpiCard from './kpi-card';
import RevenueChart from './revenue-chart';
import OrderStatusChart from './order-status-chart';
import WarehouseUtilization from './warehouse-utilization';
import RecentActivity from './recent-activity';
import { DollarSign } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface CustomDashboardViewProps {
  widgets: WidgetConfig[];
  setWidgets: React.Dispatch<React.SetStateAction<WidgetConfig[]>>;
  setIsBuilderOpen: (isOpen: boolean) => void;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  'kpi-card': KpiCard,
  'revenue-chart': RevenueChart,
  'order-status-chart': OrderStatusChart,
  'warehouse-utilization': WarehouseUtilization,
  'recent-activity': RecentActivity,
};

const placeholderProps: Record<string, any> = {
  'kpi-card': { title: 'Sample KPI', value: '1,234', change: '+10%', Icon: DollarSign },
  'revenue-chart': {},
  'order-status-chart': {},
  'warehouse-utilization': {},
  'recent-activity': {},
}


export default function CustomDashboardView({
  widgets,
  setWidgets,
  setIsBuilderOpen,
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
          <Button onClick={() => setIsBuilderOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add First Widget
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-min gap-6">
      {widgets.map((widget) => {
        const Component = componentMap[widget.type];
        return (
          <div
            key={widget.id}
            className="bg-card rounded-lg border shadow-sm p-4 relative group"
            style={{ gridColumn: `span ${widget.gridConfig.w}` }}
          >
            {Component ? <Component {...placeholderProps[widget.type]} /> : <Skeleton className="h-full w-full" />}
          </div>
        );
      })}
    </div>
  );
}
