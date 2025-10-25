import {
  Map,
  Users,
  TrendingUp,
  FileText,
  ScanSearch,
  BrainCircuit,
  Bot,
} from 'lucide-react';
import Link from 'next/link';

import type { DashboardWidgetItem } from '@/types';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/layout/header';

const widgetItems: DashboardWidgetItem[] = [
  {
    title: 'Live Logistics Map',
    description: 'Real-time tracking of shipments',
    href: '/dashboard/map',
    icon: Map,
  },
  {
    title: 'Supplier Scorecards',
    description: 'Monitor and evaluate supplier performance',
    href: '/dashboard/suppliers',
    icon: Users,
  },
  {
    title: 'Demand Forecasting',
    description: 'Predict future demand with AI',
    href: '/dashboard/forecasting',
    icon: TrendingUp,
  },
  {
    title: 'AI Reporting Hub',
    description: 'Ask questions about your documents',
    href: '/dashboard/reporting',
    icon: FileText,
  },
  {
    title: 'AI Visual Inspection',
    description: 'Automated damage detection',
    href: '/dashboard/inspection',
    icon: ScanSearch,
  },
  {
    title: 'ML Intelligence',
    description: 'Insights from your ML models',
    href: '/dashboard/ml-intelligence',
    icon: BrainCircuit,
  },
  {
    title: 'Proactive Agent',
    description: 'Monitors for delays and stock issues',
    href: '/dashboard/proactive-agent',
    icon: Bot,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {widgetItems.map((item) => (
            <Link href={item.href} key={item.title}>
              <Card className="h-full transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  <item.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
