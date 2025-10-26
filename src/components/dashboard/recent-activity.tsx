
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, DollarSign, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const recentActivityData = [
    { text: 'Shipment SH-2847 delivered to New York, NY', time: '5 min ago', Icon: CheckCircle, color: 'text-green-500' },
    { text: 'New purchase order PO-5682 created', time: '12 min ago', Icon: DollarSign, color: 'text-blue-500' },
    { text: 'Low stock alert: Raw Material RM-4521', time: '18 min ago', Icon: AlertTriangle, color: 'text-yellow-500' },
    { text: 'Inbound receipt IR-3201 inspected and approved', time: '45 min ago', Icon: Eye, color: 'text-purple-500' },
    { text: 'Batch B-1032 production completed', time: '1 hour ago', Icon: Activity, color: 'text-green-500' },
];

export default function RecentActivity({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across the supply chain</CardDescription>
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
    );
}
