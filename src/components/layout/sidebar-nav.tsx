'use client';

import {
  BrainCircuit,
  Home,
  Map,
  ScanLine,
  Truck,
  FileText,
  BarChart,
  Bot,
  type LucideIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/map', label: 'Live Logistics', icon: Map },
  { href: '/dashboard/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/dashboard/reporting', label: 'AI Reporting', icon: FileText },
  { href: '/dashboard/inspection', label: 'AI Inspection', icon: ScanLine },
  { href: '/dashboard/forecasting', label: 'Demand Forecast', icon: BarChart },
  { href: '/dashboard/proactive-agent', label: 'Proactive Agent', icon: Bot },
  { href: '/dashboard/ml-intelligence', label: 'ML Intelligence', icon: BrainCircuit },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((link) => {
        const isActive =
          link.href === '/dashboard'
            ? pathname === link.href
            : pathname.startsWith(link.href);

        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={isActive}
                tooltip={{ children: link.label }}
              >
                <link.icon />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
