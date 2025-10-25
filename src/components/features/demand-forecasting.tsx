'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, TrendingUp } from 'lucide-react';

const historicalData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const forecastData = [
  { name: 'Jul', forecast: 6200 },
  { name: 'Aug', forecast: 6500 },
  { name: 'Sep', forecast: 6800 },
  { name: 'Oct', forecast: 7100 },
  { name: 'Nov', forecast: 8000 },
  { name: 'Dec', forecast: 8500 },
];

const combinedData = historicalData.map(item => ({...item, forecast: null})).concat(forecastData.map(item => ({...item, sales: null})));

export function DemandForecasting() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp /> Demand Forecast
          </CardTitle>
          <CardDescription>
            Historical sales data and AI-powered demand forecast for the next 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer>
              <LineChart
                data={combinedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Historical Sales"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Forecasted Demand"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Forecast Insights</AlertTitle>
        <AlertDescription>
          The forecast predicts a significant increase in demand towards the end of the year, peaking in November and December. It&apos;s recommended to start increasing inventory levels from September to meet the projected demand and avoid stockouts during the peak season.
        </AlertDescription>
      </Alert>
    </div>
  );
}
