
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  generateMlIntelligenceDashboard,
  type MlIntelligenceDashboardOutput,
} from '@/ai/flows/ml-intelligence-dashboard';

export default function MlIntelligencePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MlIntelligenceDashboardOutput | null>(
    null
  );
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
      console.error('Error generating dashboard:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate ML intelligence dashboard.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="ML Intelligence Dashboard" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Analyze Model</CardTitle>
            <CardDescription>
              Input model data to generate performance insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="model-performance"
                  name="model-performance"
                  placeholder="Paste model performance metrics here..."
                  className="min-h-[120px]"
                  defaultValue="Accuracy: 98.5%, Precision: 97%, Recall: 99%, F1-Score: 0.98"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  id="key-drivers"
                  name="key-drivers"
                  placeholder="Paste key drivers data here (e.g., feature importance)..."
                  className="min-h-[120px]"
                  defaultValue="Feature 'temperature': 0.45, Feature 'pressure': 0.30, Feature 'vibration': 0.15"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate Insights'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Analysis</CardTitle>
            <CardDescription>
              Insights and recommendations from the model data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {result ? (
              <div className="space-y-4 text-sm">
                <div className="space-y-1">
                  <h4 className="font-semibold text-base">Dashboard Summary</h4>
                  <p className="text-muted-foreground">{result.dashboardSummary}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-base">Performance Insights</h4>
                  <p className="text-muted-foreground">{result.performanceInsights}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-base">Key Drivers Explanation</h4>
                  <p className="text-muted-foreground">{result.keyDriversExplanation}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-base">Recommendations</h4>
                  <p className="text-muted-foreground">{result.recommendations}</p>
                </div>
              </div>
            ) : (
              !isLoading && (
                <div className="flex items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg p-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      No Analysis Available
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Input your model data and click "Generate Insights" to see the analysis.
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
