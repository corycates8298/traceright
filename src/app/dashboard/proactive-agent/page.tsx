import { Header } from '@/components/layout/header';
import { ProactiveAgent } from '@/components/features/proactive-agent';

export default function ProactiveAgentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Proactive Agent" />
      <main className="flex-1 p-4 sm:p-6">
        <ProactiveAgent />
      </main>
    </div>
  );
}
