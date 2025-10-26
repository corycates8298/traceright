
'use client';
import WarehouseUtilization from './warehouse-utilization';
import RecentActivity from './recent-activity';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DigitalTwinPage from '@/app/dashboard/digital-twin/page';

export default function WarehouseOpsView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WarehouseUtilization className="lg:col-span-2" />
        <RecentActivity />
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Live Logistics Map</CardTitle>
                <CardDescription>Real-time location of in-transit shipments and warehouses.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-[50vh] w-full">
                    <DigitalTwinPage />
                 </div>
            </CardContent>
        </Card>
    </div>
  );
}
