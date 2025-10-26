'use client';
import KpiCard from './kpi-card';
import RevenueChart from './revenue-chart';
import OrderStatusChart from './order-status-chart';
import WarehouseUtilization from './warehouse-utilization';
import RecentActivity from './recent-activity';
import {
  DollarSign,
  CheckCircle,
  Truck,
  AlertTriangle,
} from 'lucide-react';

const kpiData = [
  { title: 'Total Revenue', value: '$2.4M', change: '+15.2%', Icon: DollarSign },
  { title: 'On-Time Delivery', value: '94.2%', change: '+0.5%', Icon: CheckCircle },
  { title: 'Active Shipments', value: '3,284', change: '-2.5%', Icon: Truck },
  { title: 'Delayed Orders', value: '47', change: '-23.1%', Icon: AlertTriangle },
];

export default function AnalystView() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <RevenueChart className="lg:col-span-2" />
        <OrderStatusChart />
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <WarehouseUtilization className="lg:col-span-2" />
        <RecentActivity />
      </div>
    </>
  );
}
