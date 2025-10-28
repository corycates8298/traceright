
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  generateMlIntelligenceDashboard,
  type MlIntelligenceDashboardOutput,
} from '@/ai/flows/ml-intelligence-dashboard';

export default function DemandForecastingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MlIntelligenceDashboardOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const modelPerformanceData = formData.get('model-performance') as string;
    const keyDriversData = formData.get('key-drivers') as string;

    try {
      const response = await generateMlIntelligenceDashboard({
        modelPerformanceData,
        keyDriversData,
      });
      setResult(response);
    } catch (error) {
      console.error('Error generating forecast:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate demand forecast. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Demand Forecasting" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Generate Forecast</CardTitle>
            <CardDescription>
              Input historical data to predict future material demand.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material-select">Select Material</Label>
                <Select name="material">
                  <SelectTrigger id="material-select">
                    <SelectValue placeholder="Select a material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="material-1">Raw Component A</SelectItem>
                    <SelectItem value="material-2">Packaging Material B</SelectItem>
                    <SelectItem value="material-3">Liquid Ingredient C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-performance">Model Performance Data</Label>
                <Textarea
                  id="model-performance"
                  name="model-performance"
                  placeholder="Paste model performance data here (e.g., accuracy, precision)"
                  className="min-h-[100px]"
                  defaultValue="Accuracy: 95%, Precision: 92%, Recall: 98%"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-drivers">Key Drivers Data</Label>
                <Textarea
                  id="key-drivers"
                  name="key-drivers"
                  placeholder="Paste key drivers data here (e.g., feature importance)"
                  className="min-h-[100px]"
                  defaultValue="Seasonality: 40%, Promotions: 30%, Economic Indicators: 20%"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Forecast'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecast Results</CardTitle>
            <CardDescription>
              AI-generated insights and recommendations based on your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {result ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Dashboard Summary</h3>
                  <p className="text-sm text-muted-foreground">{result.dashboardSummary}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Performance Insights</h3>
                  <p className="text-sm text-muted-foreground">{result.performanceInsights}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Key Drivers Explanation</h3>
                  <p className="text-sm text-muted-foreground">{result.keyDriversExplanation}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Recommendations</h3>
                  <p className="text-sm text-muted-foreground">{result.recommendations}</p>
                </div>
              </div>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      No forecast generated
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form to see results.
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
