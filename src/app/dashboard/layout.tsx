import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Chatbot } from '@/components/chatbot';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        variant="sidebar"
        className="border-sidebar-border"
      >
        <SidebarHeader className="p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Logo className="h-6 w-6 text-primary" />
            <span className="duration-200 group-data-[collapsible=icon]:opacity-0">
              TraceRight.ai
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
