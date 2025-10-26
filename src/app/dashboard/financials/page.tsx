'use client';

import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FinancialsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Financials" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              Track spending, invoices, and financial performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[40vh] border-2 border-dashed rounded-lg">
              <div className="text-center">
                <h3 className="text-xl font-bold tracking-tight">
                  Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Financial tracking and reporting features will be available here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
