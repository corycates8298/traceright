
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  Icon: LucideIcon;
  className?: string;
}

export default function KpiCard({ title, value, change, Icon, className }: KpiCardProps) {
  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 -ml-4 -mt-4 h-16 w-16 bg-primary/10 rounded-full" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground pt-1">{change} vs last month</p>
      </CardContent>
    </Card>
  );
}
