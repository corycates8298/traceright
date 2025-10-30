'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Terminal, Zap, Shield, TrendingUp, Activity } from 'lucide-react';

export default function BlackReportsDashboard() {
  const [time, setTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    systemLoad: 67,
    networkTraffic: 84,
    security: 98,
    performance: 92,
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        systemLoad: Math.floor(Math.random() * 30 + 60),
        networkTraffic: Math.floor(Math.random() * 20 + 75),
        security: Math.floor(Math.random() * 5 + 95),
        performance: Math.floor(Math.random() * 15 + 85),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const radarData = [
    { label: 'Inventory', value: 85 },
    { label: 'Logistics', value: 92 },
    { label: 'Quality', value: 88 },
    { label: 'Finance', value: 79 },
    { label: 'Suppliers', value: 91 },
  ];

  const terminalLogs = [
    { time: '14:32:01', message: 'System initialized successfully', type: 'success' },
    { time: '14:32:15', message: 'Processing order batch #4782', type: 'info' },
    { time: '14:32:29', message: 'Shipment tracking update received', type: 'info' },
    { time: '14:32:44', message: 'Quality check completed: PASSED', type: 'success' },
    { time: '14:33:02', message: 'Warning: Low stock alert on item SKU-9821', type: 'warning' },
    { time: '14:33:18', message: 'AI model prediction accuracy: 94.7%', type: 'success' },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <Header title="BLACK REPORTS" />
      <main className="flex-1 p-4 sm:p-6 bg-black text-green-400 font-mono">
        {/* Top Status Bar */}
        <div className="mb-6 flex items-center justify-between border-2 border-green-500 bg-black/80 p-4 shadow-lg shadow-green-500/20">
          <div className="flex items-center gap-4">
            <Terminal className="h-6 w-6 text-green-400 animate-pulse" />
            <span className="text-xl tracking-wider">TRACERIGHT.AI BLACK REPORTS</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-400/80">SYSTEM TIME</div>
            <div className="text-lg font-bold">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Terminal Log */}
          <Card className="lg:col-span-2 bg-black border-2 border-green-500 shadow-lg shadow-green-500/20">
            <div className="p-4 border-b-2 border-green-500 bg-green-500/10">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                <span className="font-bold">SYSTEM LOG</span>
              </div>
            </div>
            <div className="p-4 h-64 overflow-y-auto font-mono text-sm">
              {terminalLogs.map((log, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    log.type === 'success'
                      ? 'text-green-400'
                      : log.type === 'warning'
                      ? 'text-yellow-400'
                      : 'text-cyan-400'
                  }`}
                >
                  <span className="text-green-600">[{log.time}]</span> {log.message}
                </div>
              ))}
              <div className="mt-2 flex items-center">
                <span className="mr-2 text-green-400">{'>'}</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </Card>

          {/* System Metrics */}
          <Card className="bg-black border-2 border-cyan-500 shadow-lg shadow-cyan-500/20">
            <div className="p-4 border-b-2 border-cyan-500 bg-cyan-500/10">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                <span className="font-bold text-cyan-400">SYSTEM METRICS</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-cyan-400 uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-lg font-bold text-cyan-400">{value}%</span>
                  </div>
                  <div className="h-2 bg-slate-900 border border-cyan-500/50">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        value > 90
                          ? 'bg-green-500'
                          : value > 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      } shadow-lg ${
                        value > 90
                          ? 'shadow-green-500/50'
                          : value > 70
                          ? 'shadow-yellow-500/50'
                          : 'shadow-red-500/50'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Radar Chart and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <Card className="bg-black border-2 border-purple-500 shadow-lg shadow-purple-500/20">
            <div className="p-4 border-b-2 border-purple-500 bg-purple-500/10">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                <span className="font-bold text-purple-400">PERFORMANCE RADAR</span>
              </div>
            </div>
            <div className="p-6 flex items-center justify-center h-80">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Radar Grid */}
                {[...Array(5)].map((_, i) => {
                  const radius = ((i + 1) * 30);
                  const points = radarData.map((_, idx) => {
                    const angle = (idx * 72 - 90) * (Math.PI / 180);
                    const x = 100 + radius * Math.cos(angle);
                    const y = 100 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <polygon
                      key={i}
                      points={points}
                      fill="none"
                      stroke="#4a5568"
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Radar Lines */}
                {radarData.map((_, idx) => {
                  const angle = (idx * 72 - 90) * (Math.PI / 180);
                  const x = 100 + 150 * Math.cos(angle);
                  const y = 100 + 150 * Math.sin(angle);
                  return (
                    <line
                      key={idx}
                      x1="100"
                      y1="100"
                      x2={x}
                      y2={y}
                      stroke="#4a5568"
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Data Polygon */}
                <polygon
                  points={radarData.map((item, idx) => {
                    const angle = (idx * 72 - 90) * (Math.PI / 180);
                    const radius = (item.value / 100) * 150;
                    const x = 100 + radius * Math.cos(angle);
                    const y = 100 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(139, 92, 246, 0.3)"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />

                {/* Data Points */}
                {radarData.map((item, idx) => {
                  const angle = (idx * 72 - 90) * (Math.PI / 180);
                  const radius = (item.value / 100) * 150;
                  const x = 100 + radius * Math.cos(angle);
                  const y = 100 + radius * Math.sin(angle);
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#8b5cf6"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-black border-2 border-green-500 shadow-lg shadow-green-500/20 p-6">
              <Zap className="h-8 w-8 text-green-400 mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-green-400 mb-2">$2.4M</div>
              <div className="text-sm text-green-400/80">REVENUE</div>
            </Card>

            <Card className="bg-black border-2 border-cyan-500 shadow-lg shadow-cyan-500/20 p-6">
              <TrendingUp className="h-8 w-8 text-cyan-400 mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-cyan-400 mb-2">1,248</div>
              <div className="text-sm text-cyan-400/80">ORDERS</div>
            </Card>

            <Card className="bg-black border-2 border-purple-500 shadow-lg shadow-purple-500/20 p-6">
              <Shield className="h-8 w-8 text-purple-400 mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-purple-400 mb-2">94%</div>
              <div className="text-sm text-purple-400/80">QUALITY</div>
            </Card>

            <Card className="bg-black border-2 border-yellow-500 shadow-lg shadow-yellow-500/20 p-6">
              <Activity className="h-8 w-8 text-yellow-400 mb-4 animate-pulse" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">89%</div>
              <div className="text-sm text-yellow-400/80">EFFICIENCY</div>
            </Card>
          </div>
        </div>

        {/* Grid Background Effect */}
        <div
          className="fixed inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </main>
    </div>
  );
}
