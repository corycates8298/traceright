
'use client';

import {
  Home,
  Truck,
  Factory,
  Warehouse,
  DollarSign,
  Users,
  Settings,
  Shield,
  type LucideIcon,
  Package,
  Book,
  Bot,
  ScanSearch,
  FileText,
  TrendingUp,
  BrainCircuit,
  Map,
  ClipboardList,
  Box,
  Terminal,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
};

type NavGroup = {
  label: string;
  links: NavLink[];
};

const navGroups: NavGroup[] = [
  {
    label: 'Core Logistics',
    links: [
      { href: '/dashboard/logistics', label: 'Logistics', icon: Truck },
      { href: '/dashboard/inventory', label: 'Inventory', icon: Warehouse },
      { href: '/dashboard/orders', label: 'Orders', icon: Package },
    ],
  },
  {
    label: 'Production',
    links: [
      { href: '/dashboard/materials', label: 'Materials', icon: Book },
      { href: '/dashboard/recipes', label: 'Recipes', icon: Factory },
      { href: '/dashboard/products', label: 'Products', icon: Package },
      { href: '/dashboard/batches', label: 'Batches', icon: ClipboardList },
    ],
  },
  {
    label: 'Intelligence',
    links: [
      { href: '/dashboard/digital-twin', label: 'Digital Twin', icon: Map },
      { href: '/dashboard/dashboard-3d', label: 'Dashboard 3D', icon: Box },
      { href: '/dashboard/cyberpunk', label: 'Cyberpunk View', icon: Terminal },
      {
        href: '/dashboard/demand-forecasting',
        label: 'Demand Forecasting',
        icon: TrendingUp,
      },
      {
        href: '/dashboard/visual-inspection',
        label: 'AI Visual Inspection',
        icon: ScanSearch,
      },
      { href: '/dashboard/reporting', label: 'AI Reporting Hub', icon: FileText },
      {
        href: '/dashboard/proactive-agent',
        label: 'Proactive Agent',
        icon: Bot,
      },
      {
        href: '/dashboard/ml-intelligence',
        label: 'ML Intelligence',
        icon: BrainCircuit,
      },
    ],
  },
  {
    label: 'Partners',
    links: [
      { href: '/dashboard/suppliers', label: 'Suppliers', icon: Users },
      { href: '/dashboard/financials', label: 'Financials', icon: DollarSign },
    ],
  },
  {
    label: 'System',
    links: [
      { href: '/dashboard/admin', label: 'Admin', icon: Shield },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    navGroups.reduce((acc, group) => ({ ...acc, [group.label]: true }), {})
  );

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/dashboard" passHref>
          <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
            <span>
              <Home />
              <span>Dashboard</span>
            </span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>

      {navGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <Collapsible open={openGroups[group.label]} onOpenChange={() => toggleGroup(group.label)}>
            <CollapsibleTrigger asChild>
              <div className='flex items-center justify-between w-full'>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                 <Button variant="ghost" size="icon" className="h-6 w-6 group-data-[collapsible=icon]:hidden">
                    <ChevronRight className={cn('h-4 w-4 transition-transform', openGroups[group.label] && 'rotate-90')} />
                  </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu className="pl-4 pt-1">
                {group.links.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <SidebarMenuItem key={link.href}>
                      <Link href={link.disabled ? '#' : link.href} passHref>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={{ children: link.label }}
                          variant="ghost"
                          className='justify-start'
                          disabled={link.disabled}
                        >
                          <span>
                            <link.icon />
                            <span>{link.label}</span>
                          </span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      ))}
    </SidebarMenu>
  );
}
