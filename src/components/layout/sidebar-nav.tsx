'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  Truck, 
  Factory, 
  Users, 
  FileText, 
  TrendingUp,  // Use TrendingUp instead of Analytics
  Settings,
  Shield,
  Bot,
  Sparkles,
  Terminal,
  BrainCircuit,
  Map,
  Warehouse,
  ClipboardList,
  Box,
  ScanSearch,
  DollarSign,
  Book,
  Sheet
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Shipments', href: '/dashboard/shipments', icon: Truck },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: Factory },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
