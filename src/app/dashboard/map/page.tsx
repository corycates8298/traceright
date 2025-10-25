import { Header } from '@/components/layout/header';
import { LiveLogisticsMap } from '@/components/features/live-logistics-map';

export default function MapPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Live Logistics" />
      <main className="flex-1 p-4 sm:p-6">
        <LiveLogisticsMap />
      </main>
    </div>
  );
}
