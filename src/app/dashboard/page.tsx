import {
  GalleryHorizontal,
  Users,
  Package,
  FileText,
  Settings,
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
    title: 'Assets',
    description: 'Manage and track all your assets',
    href: '/dashboard/assets',
    icon: GalleryHorizontal,
  },
  {
    title: 'Inventory',
    description: 'Oversee your inventory levels',
    href: '/dashboard/inventory',
    icon: Package,
  },
  {
    title: 'Users',
    description: 'Manage user accounts and permissions',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Reports',
    description: 'Generate and view system reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    title: 'Settings',
    description: 'Configure application settings',
    href: '/dashboard/settings',
    icon: Settings,
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
