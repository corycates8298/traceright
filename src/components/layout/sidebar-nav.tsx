'use client';

import {
  Home,
  Map,
  Users,
  TrendingUp,
  FileText,
  ScanSearch,
  BrainCircuit,
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
  { href: '/dashboard/suppliers', label: 'Suppliers', icon: Users },
  { href: '/dashboard/forecasting', label: 'Forecasting', icon: TrendingUp },
  { href: '/dashboard/reporting', label: 'Reporting', icon: FileText },
  { href: '/dashboard/inspection', label: 'Inspection', icon: ScanSearch },
  { href: '/dashboard/ml-intelligence', label: 'ML Intelligence', icon: BrainCircuit },
  { href: '/dashboard/proactive-agent', label: 'Proactive Agent', icon: Bot },
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
