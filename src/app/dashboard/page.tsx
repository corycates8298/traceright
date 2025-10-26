'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Settings2, Eye, Briefcase, CircleDotDashed } from 'lucide-react';
import type { Layout } from '@/types';
import AnalystView from '@/components/dashboard/analyst-view';
import ExecutiveView from '@/components/dashboard/executive-view';
import WarehouseOpsView from '@/components/dashboard/warehouse-ops-view';


export default function DashboardPage() {
  const [layout, setLayout] = useState<Layout>('analyst');

  const renderLayout = () => {
    switch (layout) {
      case 'analyst':
        return <AnalystView />;
      case 'executive':
        return <ExecutiveView />;
      case 'warehouse':
        return <WarehouseOpsView />;
      default:
        return <AnalystView />;
    }
  };

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
              variant={layout === 'analyst' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setLayout('analyst')}
              className={layout === 'analyst' ? 'bg-primary/10 border-primary/50 text-primary' : ''}
            >
              <Eye className="mr-2 h-4 w-4" />
              Analyst View
            </Button>
            <Button
              variant={layout === 'executive' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setLayout('executive')}
               className={layout === 'executive' ? 'bg-primary/10 border-primary/50 text-primary' : ''}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Executive Summary
            </Button>
            <Button
              variant={layout === 'warehouse' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setLayout('warehouse')}
               className={layout === 'warehouse' ? 'bg-primary/10 border-primary/50 text-primary' : ''}
            >
              <CircleDotDashed className="mr-2 h-4 w-4" />
              Warehouse Ops
            </Button>
            <Button variant="ghost" size="sm">
              Custom
            </Button>
            <Button>
              <Settings2 className="mr-2 h-4 w-4" />
              Customize
            </Button>
          </div>
        </div>

        {renderLayout()}
      </main>
    </div>
  );
}
