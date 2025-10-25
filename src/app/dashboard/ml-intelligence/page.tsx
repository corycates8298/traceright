import { Header } from '@/components/layout/header';
import { MlIntelligenceDashboard } from '@/components/features/ml-intelligence-dashboard';

export default function MlIntelligencePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="ML Intelligence Dashboard" />
      <main className="flex-1 p-4 sm:p-6">
        <MlIntelligenceDashboard />
      </main>
    </div>
  );
}
