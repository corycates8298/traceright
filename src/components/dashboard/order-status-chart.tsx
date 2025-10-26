'use client';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const orderStatusData = [
  { name: 'Delivered', value: 2950, fill: "hsl(var(--chart-1))" },
  { name: 'In-Transit', value: 1250, fill: "hsl(var(--chart-2))" },
  { name: 'Processing', value: 980, fill: "hsl(var(--chart-3))" },
  { name: 'Delayed', value: 150, fill: "hsl(var(--chart-4))" },
];

export default function OrderStatusChart({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Current distribution</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderStatusData} layout="vertical" margin={{ left: 10 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" hide />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
