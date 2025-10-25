import { Header } from '@/components/layout/header';
import { AiReportingHub } from '@/components/features/ai-reporting-hub';

export default function ReportingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Reporting Hub" />
      <main className="flex-1 p-4 sm:p-6">
        <AiReportingHub />
      </main>
    </div>
  );
}
