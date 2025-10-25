import { Header } from '@/components/layout/header';
import { SupplierScorecards } from '@/components/features/supplier-scorecards';

export default function SuppliersPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Supplier Scorecards" />
      <main className="flex-1 p-4 sm:p-6">
        <SupplierScorecards />
      </main>
    </div>
  );
}
