'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  proactiveDelayAgent,
  type ProactiveDelayAgentOutput,
} from '@/ai/flows/proactive-delay-agent';

export default function ProactiveAgentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProactiveDelayAgentOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const orderId = formData.get('order-id') as string;
    const currentStockLevel = Number(formData.get('stock-level'));
    const delayThresholdDays = Number(formData.get('delay-threshold'));
    const salesData = formData.get('sales-data') as string;
    const supplierData = formData.get('supplier-data') as string;

    try {
      const response = await proactiveDelayAgent({
        orderId,
        currentStockLevel,
        delayThresholdDays,
        salesData,
        supplierData,
      });
      setResult(response);
    } catch (error) {
      console.error('Error with proactive agent:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to run proactive agent. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Proactive Delay Agent" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monitor Order</CardTitle>
            <CardDescription>
              Provide order and stock details to get proactive suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order-id">Order ID</Label>
                  <Input id="order-id" name="order-id" defaultValue="ORD-2024-789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock-level">Current Stock Level</Label>
                  <Input id="stock-level" name="stock-level" type="number" defaultValue="50" />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="delay-threshold">Delay Threshold (Days)</Label>
                  <Input id="delay-threshold" name="delay-threshold" type="number" defaultValue="3" />
                </div>
              <div className="space-y-2">
                <Label htmlFor="sales-data">Sales Data</Label>
                <Textarea
                  id="sales-data"
                  name="sales-data"
                  placeholder="Paste historical sales data here..."
                  className="min-h-[80px]"
                  defaultValue="Last 30 days avg: 10 units/day. Last 7 days: 15 units/day."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier-data">Supplier Data</Label>
                <Textarea
                  id="supplier-data"
                  name="supplier-data"
                  placeholder="Paste available supplier data here..."
                  className="min-h-[80px]"
                  defaultValue="Supplier A: 5-day lead, $10/unit. Supplier B: 3-day lead, $12/unit."
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Run Agent'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agent Analysis & Suggestions</CardTitle>
            <CardDescription>
              AI-powered recommendations to mitigate supply chain risks.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  {result.isDelayed ? (
                    <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
                  ) : (
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                  )}
                  <p className="font-semibold text-lg">
                    {result.isDelayed ? 'Potential Delay Detected' : 'Order On Track'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Alternative Suppliers</h4>
                  {result.alternativeSuppliers.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {result.alternativeSuppliers.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No suitable alternatives found based on current data.</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Suggested Purchase Order</h4>
                  <p className="text-sm text-muted-foreground bg-slate-100 p-3 rounded-md">
                    {result.suggestedPurchaseOrder}
                  </p>
                </div>

              </div>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg p-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      No Analysis Performed
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form and run the agent to see suggestions.
                    </p>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
