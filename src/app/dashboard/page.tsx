import { Header } from '@/components/layout/header';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Welcome to TraceRight.ai" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-center h-[60vh] border-2 border-dashed rounded-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Intelligent Operations Platform</h2>
                <p className="text-muted-foreground">Select a module from the sidebar to get started.</p>
            </div>
        </div>
      </main>
    </div>
  );
}
