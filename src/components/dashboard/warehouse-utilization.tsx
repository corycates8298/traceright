'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const warehouseData = [
    { name: 'West Coast', usage: 85 },
    { name: 'East Coast', usage: 92 },
    { name: 'Midwest', usage: 78 },
    { name: 'South', usage: 81 },
];

export default function WarehouseUtilization({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Warehouse Utilization</CardTitle>
                <CardDescription>Capacity usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {warehouseData.map(warehouse => (
                    <div key={warehouse.name}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{warehouse.name}</span>
                            <span className="text-sm text-muted-foreground">{warehouse.usage}%</span>
                        </div>
                        <Progress value={warehouse.usage} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
