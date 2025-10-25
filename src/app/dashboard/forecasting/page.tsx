import { Header } from '@/components/layout/header';
import { DemandForecasting } from '@/components/features/demand-forecasting';

export default function ForecastingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Demand Forecasting" />
      <main className="flex-1 p-4 sm:p-6">
        <DemandForecasting />
      </main>
    </div>
  );
}
