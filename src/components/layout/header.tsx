'use client';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  // Check if we're within a SidebarProvider context
  let hasSidebar = false;
  try {
    useSidebar();
    hasSidebar = true;
  } catch {
    hasSidebar = false;
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-16 sm:px-6">
      {hasSidebar && (
        <div className="block md:hidden">
          <SidebarTrigger />
        </div>
      )}
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
