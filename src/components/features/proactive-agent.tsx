'use client';

import { useState, type FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  Bot,
  Sparkles,
  AlertTriangle,
  ClipboardList,
  Truck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { proactiveDelayAgent } from '@/ai/flows/proactive-delay-agent';

type AgentResult = {
  isDelayed: boolean;
  alternativeSuppliers: string[];
  suggestedPurchaseOrder: string;
};

const mockSalesData = `Weekly sales average: 150 units. Seasonal uplift: 20% in Q4.`;
const mockSupplierData = `Supplier A: 5 day lead time, $10/unit. Supplier B: 3 day lead time, $12/unit. Supplier C: 7 day lead time, $9/unit.`;

export function ProactiveAgent() {
  const [orderId, setOrderId] = useState('ORD-12345');
  const [stockLevel, setStockLevel] = useState('500');
  const [delayThreshold, setDelayThreshold] = useState('3');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AgentResult | null>(null);
  const { toast } = useToast();

  const handleMonitor = async (e: FormEvent) => {
    e.preventDefault();
    if (!orderId || !stockLevel || !delayThreshold) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all fields to run the agent.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await proactiveDelayAgent({
        orderId,
        currentStockLevel: parseInt(stockLevel),
        delayThresholdDays: parseInt(delayThreshold),
        salesData: mockSalesData,
        supplierData: mockSupplierData,
      });
      setResult(response);
    } catch (error) {
      console.error('Proactive Agent error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to run the proactive agent.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot /> Proactive Monitoring Agent
          </CardTitle>
          <CardDescription>
            Simulate monitoring an order for delays and low stock.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleMonitor}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="stockLevel">Current Stock Level (units)</Label>
              <Input
                id="stockLevel"
                type="number"
                value={stockLevel}
                onChange={(e) => setStockLevel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="delayThreshold">Delay Threshold (days)</Label>
              <Input
                id="delayThreshold"
                type="number"
                value={delayThreshold}
                onChange={(e) => setDelayThreshold(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Monitoring...
                </>
              ) : (
                'Run Agent'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles /> Agent Suggestions
          </CardTitle>
          <CardDescription>
            The agent&apos;s findings and suggestions will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <Card
                className={
                  result.isDelayed
                    ? 'bg-destructive/10 border-destructive'
                    : 'bg-green-500/10 border-green-500'
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                  <AlertTriangle
                    className={
                      result.isDelayed ? 'text-destructive' : 'text-green-500'
                    }
                  />
                  <div className="font-semibold">
                    {result.isDelayed
                      ? 'Critical Delay Detected'
                      : 'Order is On Track'}
                  </div>
                </CardHeader>
              </Card>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Truck /> Alternative Suppliers
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {result.alternativeSuppliers.map((supplier, i) => (
                    <li key={i}>{supplier}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <ClipboardList /> Suggested Purchase Order
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-3 rounded-md font-mono">
                  {result.suggestedPurchaseOrder}
                </p>
              </div>
            </div>
          )}
          {!isLoading && !result && (
            <div className="text-center text-muted-foreground p-8">
              <p>Agent suggestions will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
