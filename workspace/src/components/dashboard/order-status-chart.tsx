
'use client';
import { Bar, XAxis, YAxis, ResponsiveContainer, BarChart as RechartsBarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const orderStatusData = [
  { name: 'Delivered', value: 2950, fill: "var(--color-delivered)" },
  { name: 'In-Transit', value: 1250, fill: "var(--color-in-transit)" },
  { name: 'Processing', value: 980, fill: "var(--color-processing)" },
  { name: 'Delayed', value: 150, fill: "var(--color-delayed)" },
];

const chartConfig = {
    value: {
      label: 'Orders',
    },
    delivered: {
      label: 'Delivered',
      color: 'hsl(var(--chart-1))',
    },
    'in-transit': {
      label: 'In-Transit',
      color: 'hsl(var(--chart-2))',
    },
    processing: {
      label: 'Processing',
      color: 'hsl(var(--chart-3))',
    },
    delayed: {
        label: 'Delayed',
        color: 'hsl(var(--chart-4))',
    }
}


export default function OrderStatusChart({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Current distribution of all orders</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <RechartsBarChart
                accessibilityLayer
                data={orderStatusData}
                layout="vertical"
                margin={{ left: 10 }}
            >
                 <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className="text-xs"
                />
                <XAxis type="number" dataKey="value" hide />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="value" radius={4} barSize={30} />
            </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
