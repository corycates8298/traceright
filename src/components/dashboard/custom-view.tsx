
'use client';

import React from 'react';
import type { WidgetConfig, WidgetType } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, X } from 'lucide-react';
import KpiCard from './kpi-card';
import RevenueChart from './revenue-chart';
import OrderStatusChart from './order-status-chart';
import WarehouseUtilization from './warehouse-utilization';
import RecentActivity from './recent-activity';
import { DollarSign, CheckCircle, Truck, AlertTriangle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
} from '@/components/ui/card';

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

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };


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
      {widgets.map((widget, index) => {
        const Component = componentMap[widget.type];
        const props = placeholderProps[widget.type];
        
        // This is a simple way to create some variety in the placeholder KPI cards
        if (widget.type === 'kpi-card' && index > 0) {
            const kpiPlaceholders = [
                { title: 'On-Time Delivery', value: '94.2%', change: '+0.5%', Icon: CheckCircle },
                { title: 'Active Shipments', value: '3,284', change: '-2.5%', Icon: Truck },
                { title: 'Delayed Orders', value: '47', change: '-23.1%', Icon: AlertTriangle },
            ];
            Object.assign(props, kpiPlaceholders[(index-1) % kpiPlaceholders.length]);
        }

        return (
          <Card
            key={widget.id}
            style={{ 
                gridColumn: `span ${Math.min(widget.gridConfig.w, 4)}`,
            }}
            className={cn(
                "relative group/widget",
                widget.type.includes('chart') ? 'row-span-2' : ''
            )}
          >
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/widget:opacity-100 transition-opacity z-10">
                 <Button variant="ghost" size="icon" className="h-7 w-7 cursor-grab">
                    <GripVertical className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeWidget(widget.id)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
            
            {Component ? <Component {...props} /> : <Skeleton className="h-full w-full" />}
          </Card>
        );
      })}
    </div>
  );
}
