
'use client';
import KpiCard from './kpi-card';
import RevenueChart from './revenue-chart';
import OrderStatusChart from './order-status-chart';
import {
  DollarSign,
  CheckCircle,
  Truck,
  AlertTriangle,
} from 'lucide-react';
import WarehouseUtilization from './warehouse-utilization';
import RecentActivity from './recent-activity';

const kpiData = [
  { title: 'Total Revenue', value: '$2.4M', change: '+15.2%', Icon: DollarSign },
  { title: 'On-Time Delivery', value: '94.2%', change: '+0.5%', Icon: CheckCircle },
  { title: 'Active Shipments', value: '3,284', change: '-2.5%', Icon: Truck },
  { title: 'Delayed Orders', value: '47', change: '-23.1%', Icon: AlertTriangle },
];

export default function ExecutiveView() {
  return (
    <div className="grid gap-6">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
       </div>
        <RevenueChart />
        <OrderStatusChart />
        <WarehouseUtilization />
        <RecentActivity />
    </div>
  );
}
