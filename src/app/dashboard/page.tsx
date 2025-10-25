import {
  BarChart,
  Bot,
  BrainCircuit,
  FileText,
  Map,
  ScanLine,
  Truck,
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
    title: 'Live Logistics',
    description: 'Real-time map of all in-transit orders.',
    href: '/dashboard/map',
    icon: Map,
  },
  {
    title: 'Supplier Scorecards',
    description: 'Manage supplier details and performance.',
    href: '/dashboard/suppliers',
    icon: Truck,
  },
  {
    title: 'AI Reporting Hub',
    description: 'Ask questions about compliance documents.',
    href: '/dashboard/reporting',
    icon: FileText,
  },
  {
    title: 'AI Visual Inspection',
    description: 'Detect damage and verify delivery labels.',
    href: '/dashboard/inspection',
    icon: ScanLine,
  },
  {
    title: 'Demand Forecasting',
    description: 'Predict future material needs with AI.',
    href: '/dashboard/forecasting',
    icon: BarChart,
  },
  {
    title: 'Proactive Agent',
    description: 'Monitor delays and stock levels automatically.',
    href: '/dashboard/proactive-agent',
    icon: Bot,
  },
  {
    title: 'ML Intelligence',
    description: 'Visualize performance of AI models.',
    href: '/dashboard/ml-intelligence',
    icon: BrainCircuit,
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
