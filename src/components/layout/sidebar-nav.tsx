'use client';

import {
  GalleryHorizontal,
  Home,
  Users,
  Package,
  FileText,
  Settings,
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
  { href: '/dashboard/assets', label: 'Assets', icon: GalleryHorizontal },
  { href: '/dashboard/inventory', label: 'Inventory', icon: Package },
  { href: '/dashboard/users', label: 'Users', icon: Users },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
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
