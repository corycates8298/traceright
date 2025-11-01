'use client';

import { useUser } from '@/firebase';
import { Package, TrendingUp, Truck, Users } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();

  const stats = [
    { name: 'Total Orders', value: '1,234', icon: Package, change: '+12.5%', changeType: 'positive' },
    { name: 'Active Shipments', value: '89', icon: Truck, change: '+4.3%', changeType: 'positive' },
    { name: 'Total Customers', value: '567', icon: Users, change: '+8.1%', changeType: 'positive' },
    { name: 'Revenue', value: '$2.4M', icon: TrendingUp, change: '+15.3%', changeType: 'positive' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your supply chain today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.name}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Order #{1000 + i} delivered successfully
                </p>
                <p className="text-xs text-gray-500 mt-1">{i} hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
