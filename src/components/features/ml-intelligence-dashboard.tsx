'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateMlIntelligenceDashboard } from '@/ai/flows/ml-intelligence-dashboard';
import { Loader2, BrainCircuit, Sparkles, Lightbulb, BarChart, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type DashboardResult = {
    dashboardSummary: string;
    performanceInsights: string;
    keyDriversExplanation: string;
    recommendations: string;
};

const mockPerformanceData = `{
  "accuracy": 0.92,
  "precision": 0.89,
  "recall": 0.94,
  "f1_score": 0.91,
  "confusion_matrix": {
    "true_positive": 850,
    "false_positive": 100,
    "true_negative": 1000,
    "false_negative": 50
  }
}`;

const mockKeyDriversData = `{
  "feature_importance": {
    "supplier_rating": 0.45,
    "distance_km": 0.25,
    "item_weight_kg": 0.15,
    "shipping_lane": 0.10,
    "time_of_day": 0.05
  }
}`;


export function MlIntelligenceDashboard() {
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  const [driversData, setDriversData] = useState(mockKeyDriversData);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DashboardResult | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!performanceData.trim() || !driversData.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both performance and key drivers data.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await generateMlIntelligenceDashboard({
        modelPerformanceData: performanceData,
        keyDriversData: driversData,
      });
      setResult(response);
    } catch (error) {
      console.error('ML Intelligence Dashboard error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate the dashboard.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <Card className="xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit /> Model Data Input
          </CardTitle>
          <CardDescription>
            Provide JSON data for your model&apos;s performance and drivers.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleGenerate}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="performanceData">Model Performance Data</Label>
              <Textarea
                id="performanceData"
                value={performanceData}
                onChange={(e) => setPerformanceData(e.target.value)}
                className="h-48 font-mono text-xs"
              />
            </div>
            <div>
              <Label htmlFor="driversData">Key Drivers Data</Label>
              <Textarea
                id="driversData"
                value={driversData}
                onChange={(e) => setDriversData(e.target.value)}
                className="h-36 font-mono text-xs"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Insights</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-6 xl:col-span-2">
        {isLoading && (
            <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed p-12">
              <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Generating intelligence dashboard...</p>
              </div>
            </div>
          )}
        {result ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText /> Dashboard Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{result.dashboardSummary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart /> Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.performanceInsights}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb /> Key Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.keyDriversExplanation}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle /> Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.recommendations}</p>
              </CardContent>
            </Card>
          </>
        ) : !isLoading && (
            <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed p-12">
              <div className="text-center">
                  <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">AI-generated insights will appear here.</p>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}
