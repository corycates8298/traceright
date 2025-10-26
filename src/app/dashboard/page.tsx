
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Settings2, Eye, Briefcase, CircleDotDashed, LayoutGrid, Plus } from 'lucide-react';
import type { Layout, WidgetConfig } from '@/types';
import AnalystView from '@/components/dashboard/analyst-view';
import ExecutiveView from '@/components/dashboard/executive-view';
import WarehouseOpsView from '@/components/dashboard/warehouse-ops-view';
import CustomDashboardView from '@/components/dashboard/custom-view';
import { useTheme } from '@/context/ThemeContext';
import { WidgetBuilder } from '@/components/dashboard/widget-builder';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function DashboardPage() {
  const [layout, setLayout] = useState<Layout>('analyst');
  const { setOpen } = useTheme();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [widgets, setWidgets] = useLocalStorage<WidgetConfig[]>('custom-dashboard-widgets', []);

  const renderLayout = () => {
    switch (layout) {
      case 'analyst':
        return <AnalystView />;
      case 'executive':
        return <ExecutiveView />;
      case 'warehouse':
        return <WarehouseOpsView />;
      case 'custom':
        return <CustomDashboardView widgets={widgets} setWidgets={setWidgets} setIsBuilderOpen={setIsBuilderOpen} />;
      default:
        return <AnalystView />;
    }
  };

  const getButtonClass = (buttonLayout: Layout) => {
    return layout === buttonLayout ? 'outline' : 'ghost';
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-muted-foreground text-lg">
            30,000-foot view of your supply chain operations
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={getButtonClass('analyst')}
              size="sm"
              onClick={() => setLayout('analyst')}
            >
              <Eye className="mr-2 h-4 w-4" />
              Analyst View
            </Button>
            <Button
              variant={getButtonClass('executive')}
              size="sm"
              onClick={() => setLayout('executive')}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Executive Summary
            </Button>
            <Button
              variant={getButtonClass('warehouse')}
              size="sm"
              onClick={() => setLayout('warehouse')}
            >
              <CircleDotDashed className="mr-2 h-4 w-4" />
              Warehouse Ops
            </Button>
             <Button
              variant={getButtonClass('custom')}
              size="sm"
              onClick={() => setLayout('custom')}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Custom
              {layout === 'custom' && widgets.length > 0 && (
                 <span className="ml-2 bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs">
                    {widgets.length}
                  </span>
              )}
            </Button>
            {layout === 'custom' && (
                <Button size="sm" onClick={() => setIsBuilderOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Widget
                </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              <Settings2 className="mr-2 h-4 w-4" />
              Customize
            </Button>
          </div>
        </div>

        {renderLayout()}
      </main>
      <WidgetBuilder isOpen={isBuilderOpen} setIsOpen={setIsBuilderOpen} setWidgets={setWidgets} />
    </div>
  );
}
