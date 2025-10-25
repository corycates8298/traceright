import { Header } from '@/components/layout/header';
import { AiVisualInspection } from '@/components/features/ai-visual-inspection';

export default function InspectionPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Visual Inspection" />
      <main className="flex-1 p-4 sm:p-6">
        <AiVisualInspection />
      </main>
    </div>
  );
}
