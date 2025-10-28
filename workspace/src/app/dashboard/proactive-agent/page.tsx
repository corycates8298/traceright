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
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Brain,
  GitBranch,
  Database,
  TrendingUp,
  Sparkles,
  Zap,
  FileText
} from 'lucide-react';
import {
  proactiveDelayAgent,
  type ProactiveDelayAgentOutput,
} from '@/ai/flows/proactive-delay-agent';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mock playbook bullets for demonstration
const MOCK_PLAYBOOK_BULLETS = [
  { id: 'supply-0001', content: 'Calculate reorder point = lead_time × avg_daily_usage × safety_factor(1.5)', helpful: 47, harmful: 2 },
  { id: 'supply-0002', content: 'Check supplier reliability from historical on-time delivery %', helpful: 38, harmful: 1 },
  { id: 'supply-0003', content: 'Flag delays when: current_stock / daily_usage < lead_time_days', helpful: 52, harmful: 0 },
  { id: 'api-0010', content: 'Paginate through all supplier data, never use fixed ranges', helpful: 31, harmful: 0 },
];

export default function ProactiveAgentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProactiveDelayAgentOutput | null>(null);
  const [bulletsUsed, setBulletsUsed] = useState<string[]>([]);
  const [showPlaybook, setShowPlaybook] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);
    setBulletsUsed([]);

    const formData = new FormData(event.currentTarget);
    const orderId = formData.get('order-id') as string;
    const currentStockLevel = Number(formData.get('stock-level'));
    const delayThresholdDays = Number(formData.get('delay-threshold'));
    const salesData = formData.get('sales-data') as string;
    const supplierData = formData.get('supplier-data') as string;

    // Simulate ACE agent workflow
    setTimeout(() => {
      // Simulate which bullets were used
      setBulletsUsed(['supply-0001', 'supply-0002', 'supply-0003']);

      // Mock result
      setResult({
        isDelayed: currentStockLevel < 100,
        alternativeSuppliers: ['Supplier B (3-day lead, $12/unit)', 'Supplier C (4-day lead, $11/unit)'],
        suggestedPurchaseOrder: `Order 150 units from Supplier B. Current stock (${currentStockLevel}) will last ${Math.floor(currentStockLevel / 15)} days at current usage rate (15/day). Supplier B's 3-day lead + 1.5x safety factor = order now to avoid stockout.`
      });
      setIsLoading(false);
    }, 2000);

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
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-background to-slate-50 dark:to-slate-950">
      <Header title="Proactive Supply Chain Agent" />

      {/* ACE Framework Banner */}
      <div className="border-b bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  ACE Methodology
                </h2>
                <p className="text-xs text-muted-foreground">Agentic Context Engineering</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 ml-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="gap-1">
                      <Brain className="h-3 w-3" />
                      Generator
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Executes tasks using learned playbook strategies</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span className="text-muted-foreground">→</span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="gap-1">
                      <GitBranch className="h-3 w-3" />
                      Reflector
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Analyzes results and extracts insights</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <span className="text-muted-foreground">→</span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="gap-1">
                      <Database className="h-3 w-3" />
                      Curator
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">Updates playbook with new learnings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPlaybook(!showPlaybook)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            {showPlaybook ? 'Hide' : 'View'} Playbook
          </Button>
        </div>
      </div>

      <main className="flex-1 p-4 sm:p-6">
        <div className="container mx-auto grid gap-6 md:grid-cols-2">
          {/* Input Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-600" />
                Monitor Order
              </CardTitle>
              <CardDescription>
                Provide order and stock details to get AI-powered proactive suggestions
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
                <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ACE Agent Running...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Run ACE Analysis
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-violet-600" />
                ACE Analysis & Recommendations
              </CardTitle>
              <CardDescription>
                AI-powered insights using learned supply chain strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-violet-600 mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">ACE Agent Workflow:</p>
                  <div className="space-y-2 text-xs text-center">
                    <div className="flex items-center gap-2 text-violet-600">
                      <Brain className="h-3 w-3" />
                      <span>Generator: Applying playbook strategies...</span>
                    </div>
                  </div>
                </div>
              )}

              {result && !isLoading && (
                <div className="space-y-6">
                  {/* Status */}
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
                    {result.isDelayed ? (
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                    <p className="font-semibold text-lg">
                      {result.isDelayed ? 'Potential Delay Detected' : 'Order On Track'}
                    </p>
                  </div>

                  {/* Playbook Bullets Used */}
                  {bulletsUsed.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                        <Database className="h-4 w-4 text-violet-600" />
                        ACE Playbook Strategies Applied
                      </h4>
                      <div className="space-y-2">
                        {bulletsUsed.map((bulletId) => {
                          const bullet = MOCK_PLAYBOOK_BULLETS.find(b => b.id === bulletId);
                          if (!bullet) return null;
                          return (
                            <div key={bulletId} className="text-xs p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <code className="text-violet-600 font-mono">[{bullet.id}]</code>
                                <div className="flex gap-2">
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <CheckCircle2 className="h-2 w-2 text-green-500" />
                                    {bullet.helpful}
                                  </Badge>
                                  {bullet.harmful > 0 && (
                                    <Badge variant="outline" className="text-xs gap-1">
                                      <AlertCircle className="h-2 w-2 text-red-500" />
                                      {bullet.harmful}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-muted-foreground">{bullet.content}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Alternative Suppliers */}
                  <div>
                    <h4 className="font-semibold mb-2">Alternative Suppliers</h4>
                    {result.alternativeSuppliers.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {result.alternativeSuppliers.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No suitable alternatives found.</p>
                    )}
                  </div>

                  {/* Suggested Action */}
                  <div>
                    <h4 className="font-semibold mb-2">Suggested Purchase Order</h4>
                    <p className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                      {result.suggestedPurchaseOrder}
                    </p>
                  </div>

                  {/* Feedback Section */}
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Was this analysis helpful?</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                        Helpful
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                        Not Helpful
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Your feedback trains the ACE Reflector to improve future predictions
                    </p>
                  </div>
                </div>
              )}

              {!result && !isLoading && (
                <div className="flex items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg p-4">
                  <div>
                    <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-bold tracking-tight">
                      No Analysis Performed
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Fill out the form and run the ACE agent to see AI-powered suggestions
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Playbook Display */}
        {showPlaybook && (
          <Card className="mt-6 container mx-auto shadow-lg border-violet-200 dark:border-violet-800">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-violet-600" />
                ACE Playbook: Supply Chain Strategies
              </CardTitle>
              <CardDescription>
                Learned strategies that improve with every prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                {MOCK_PLAYBOOK_BULLETS.map((bullet) => (
                  <div key={bullet.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <code className="text-violet-600 font-mono text-sm">[{bullet.id}]</code>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="gap-1">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                {bullet.helpful}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Marked helpful {bullet.helpful} times</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {bullet.harmful > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="gap-1">
                                  <AlertCircle className="h-3 w-3 text-red-500" />
                                  {bullet.harmful}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Marked harmful {bullet.harmful} times</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{bullet.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🎯 About ACE Methodology
                </h4>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Agentic Context Engineering (ACE) creates self-improving AI agents through a 3-phase workflow:
                  <strong> Generator</strong> executes tasks using learned strategies,
                  <strong> Reflector</strong> analyzes results to extract insights, and
                  <strong> Curator</strong> updates the playbook. Each prediction improves future accuracy through
                  systematic feedback loops.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
