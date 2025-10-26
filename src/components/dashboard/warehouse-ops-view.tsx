'use client';
import WarehouseUtilization from './warehouse-utilization';
import RecentActivity from './recent-activity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function WarehouseOpsView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WarehouseUtilization className="lg:col-span-2" />
        <RecentActivity />
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Live Map</CardTitle>
            </CardHeader>
            <CardContent>
                 <Skeleton className="h-[400px] w-full" />
            </CardContent>
        </Card>
    </div>
  );
}
