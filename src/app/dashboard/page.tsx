
'use client';

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Eye, Briefcase, Settings2, DollarSign, AlertTriangle, Truck, CheckCircle, Activity, CircleDotDashed } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const kpiData = [
  { title: 'Total Revenue', value: '$2.4M', change: '+15.2%', Icon: DollarSign },
  { title: 'On-Time Delivery', value: '94.2%', change: '+0.5%', Icon: CheckCircle },
  { title: 'Active Shipments', value: '3,284', change: '-2.5%', Icon: Truck },
  { title: 'Delayed Orders', value: '47', change: '-23.1%', Icon: AlertTriangle },
];

const revenueData = [
  { month: 'Jan', revenue: 180000, orders: 1200 },
  { month: 'Feb', revenue: 210000, orders: 1300 },
  { month: 'Mar', revenue: 200000, orders: 1250 },
  { month: 'Apr', revenue: 250000, orders: 1500 },
  { month: 'May', revenue: 260000, orders: 1550 },
  { month: 'Jun', revenue: 280000, orders: 1600 },
];

const orderStatusData = [
    { name: 'Delivered', value: 2950 },
    { name: 'In-Transit', value: 1250 },
    { name: 'Processing', value: 980 },
    { name: 'Delayed', value: 150 },
];

const warehouseData = [
    { name: 'West Coast', usage: 85 },
    { name: 'East Coast', usage: 92 },
    { name: 'Midwest', usage: 78 },
    { name: 'South', usage: 81 },
];

const recentActivityData = [
    { text: 'Shipment SH-2847 delivered to New York, NY', time: '5 min ago', Icon: CheckCircle, color: 'text-green-500' },
    { text: 'New purchase order PO-5682 created', time: '12 min ago', Icon: DollarSign, color: 'text-blue-500' },
    { text: 'Low stock alert: Raw Material RM-4521', time: '18 min ago', Icon: AlertTriangle, color: 'text-yellow-500' },
    { text: 'Inbound receipt IR-3201 inspected and approved', time: '45 min ago', Icon: Eye, color: 'text-purple-500' },
    { text: 'Batch B-1032 production completed', time: '1 hour ago', Icon: Activity, color: 'text-green-500' },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-muted-foreground text-lg">30,000-foot view of your supply chain operations</h2>
            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="bg-primary/10 border-primary/50 text-primary">
                    <Eye className="mr-2 h-4 w-4" />
                    Analyst View
                </Button>
                <Button variant="ghost" size="sm">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Executive Summary
                </Button>
                <Button variant="ghost" size="sm">
                    <CircleDotDashed className="mr-2 h-4 w-4" />
                     Warehouse Ops
                </Button>
                 <Button variant="ghost" size="sm">
                    Custom
                </Button>
                <Button>
                    <Settings2 className="mr-2 h-4 w-4" />
                    Customize
                </Button>
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map(({ title, value, change, Icon }) => (
            <Card key={title} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 -ml-4 -mt-4 h-16 w-16 bg-primary/10 rounded-full"/>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground pt-1">{change} vs last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Revenue & Orders</CardTitle>
                    <CardDescription>6-month trend</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: 'var(--radius)'
                            }}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                    <CardDescription>Current distribution</CardDescription>
                </CardHeader>
                <CardContent className="pl-0">
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderStatusData} layout="vertical" margin={{ left: 10 }}>
                             <XAxis type="number" hide />
                             <YAxis type="category" dataKey="name" hide />
                             <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

         <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
             <Card className="lg:col-span-2">
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
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentActivityData.map(activity => (
                            <li key={activity.text} className="flex items-start gap-3">
                                <activity.Icon className={`h-4 w-4 mt-1 flex-shrink-0 ${activity.color}`} />
                                <div className="flex-grow">
                                    <p className="text-sm">{activity.text}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
         </div>
      </main>
    </div>
  );
}
