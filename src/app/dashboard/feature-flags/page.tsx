'use client';

import { Header } from '@/components/layout/header';
import { FeatureFlagsManager } from '@/components/FeatureFlagsManager';

export default function FeatureFlagsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="🎛️ Feature Flags" />
      <main className="flex-1 p-4 sm:p-6">
        <FeatureFlagsManager />
      </main>
    </div>
  );
}
