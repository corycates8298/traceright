'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';

export default function Dashboard3DPage() {
  const { theme } = useTheme();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'Supply Chain Efficiency', value: 94, color: '#10b981' },
    { label: 'Quality Score', value: 88, color: '#3b82f6' },
    { label: 'On-Time Delivery', value: 92, color: '#f59e0b' },
    { label: 'Cost Optimization', value: 85, color: '#8b5cf6' },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard 3D" />
      <main className="flex-1 p-4 sm:p-6 bg-slate-950 overflow-hidden">
        <div className="relative h-[80vh] flex items-center justify-center">
          {/* 3D Container with perspective */}
          <div
            className="relative w-full h-full"
            style={{
              perspective: '1000px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Central Status Sphere */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
              style={{
                transform: `translate(-50%, -50%) rotateX(${rotation * 0.3}deg) rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">94%</div>
                  <div className="text-sm text-white/80">System Status</div>
                </div>
              </div>
            </div>

            {/* Rotating Metric Rings */}
            {metrics.map((metric, index) => {
              const angle = (rotation + (index * 90)) * (Math.PI / 180);
              const radius = 300;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;

              return (
                <div
                  key={metric.label}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-rotation - (index * 90)}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Card className="w-48 h-32 bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl p-4">
                    <div className="flex flex-col h-full justify-between">
                      <div className="text-xs text-slate-400">{metric.label}</div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">{metric.value}%</div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${metric.value}%`,
                              backgroundColor: metric.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}

            {/* Feature Cards in 3D Space */}
            <div
              className="absolute top-20 left-20"
              style={{
                transform: `rotateX(${rotation * 0.2}deg) rotateY(${rotation * 0.3}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <Card className="w-64 bg-slate-900/60 backdrop-blur-sm border-slate-700 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Tracking</h3>
                <p className="text-sm text-slate-400">Monitor all shipments across the supply chain in 3D space</p>
              </Card>
            </div>

            <div
              className="absolute top-20 right-20"
              style={{
                transform: `rotateX(${-rotation * 0.2}deg) rotateY(${-rotation * 0.3}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <Card className="w-64 bg-slate-900/60 backdrop-blur-sm border-slate-700 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Predictive Analytics</h3>
                <p className="text-sm text-slate-400">AI-powered forecasting for demand and supply</p>
              </Card>
            </div>

            <div
              className="absolute bottom-20 left-20"
              style={{
                transform: `rotateX(${rotation * 0.15}deg) rotateY(${rotation * 0.25}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <Card className="w-64 bg-slate-900/60 backdrop-blur-sm border-slate-700 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Quality Control</h3>
                <p className="text-sm text-slate-400">Automated inspection and compliance monitoring</p>
              </Card>
            </div>

            <div
              className="absolute bottom-20 right-20"
              style={{
                transform: `rotateX(${-rotation * 0.15}deg) rotateY(${-rotation * 0.25}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <Card className="w-64 bg-slate-900/60 backdrop-blur-sm border-slate-700 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Cost Optimization</h3>
                <p className="text-sm text-slate-400">Intelligent routing and resource allocation</p>
              </Card>
            </div>
          </div>

          {/* Starfield Background Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
