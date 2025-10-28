
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-16 sm:px-6">
      <div className="block md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        <UserNav />
      </div>
    </header>
  );
}
