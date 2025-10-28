// src/app/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AIAnalysisPanel } from '@/components/analytics/AIAnalysisPanel';
import { PivotTableBuilder } from '@/components/analytics/PivotTableBuilder';
import { DataCleaningTools } from '@/components/analytics/DataCleaningTools';
import {
  WaterfallChart,
  TreemapChart,
  ScatterPlot,
  RadarChartComponent,
  FunnelChart,
  CombinationChart,
  StackedAreaChart,
  GaugeChart,
  BulletChart,
  HeatmapChart,
  sampleWaterfallData,
  sampleTreemapData,
  sampleScatterData,
  sampleRadarData,
  sampleFunnelData,
  sampleCombinationData,
  sampleStackedAreaData,
  sampleHeatmapData,
} from '@/components/charts/AdvancedChartLibrary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BarChart3, ArrowLeft, Sparkles, Table2, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [aiPanelOpen, setAIPanelOpen] = useState(false);
  const [pivotBuilderOpen, setPivotBuilderOpen] = useState(false);
  const [dataCleaningOpen, setDataCleaningOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-[1800px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </Link>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Advanced Analytics Studio
              </h1>
              <p className="text-slate-600">
                15+ professional chart types powered by Figma TraceRight 2.0 + AI Analysis
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Figma Integration
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  10 Chart Types
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setPivotBuilderOpen(true)}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Table2 className="w-5 h-5" />
                Pivot Tables
              </Button>
              <Button
                onClick={() => setDataCleaningOpen(true)}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Data Cleaning
              </Button>
              <Button
                onClick={() => setAIPanelOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white gap-2"
              >
                <Brain className="w-5 h-5" />
                AI Analysis
              </Button>
            </div>
          </div>

          {/* Chart Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Waterfall Chart */}
            <WaterfallChart data={sampleWaterfallData} title="Revenue Waterfall Chart" />

            {/* Treemap Chart */}
            <TreemapChart data={sampleTreemapData} title="Sales by Category (Treemap)" />

            {/* Scatter Plot */}
            <ScatterPlot data={sampleScatterData} title="Price vs Demand Correlation" />

            {/* Radar Chart */}
            <RadarChartComponent data={sampleRadarData} title="Supplier Performance Metrics" />

            {/* Funnel Chart */}
            <FunnelChart data={sampleFunnelData} title="Sales Funnel Conversion" />

            {/* Combination Chart */}
            <CombinationChart data={sampleCombinationData} title="Revenue & Growth Rate" />

            {/* Stacked Area Chart */}
            <StackedAreaChart data={sampleStackedAreaData} title="Product Mix Over Time" />

            {/* Gauge Chart */}
            <GaugeChart value={87} max={100} title="Warehouse Capacity" label="Utilization" />

            {/* Bullet Chart */}
            <BulletChart actual={156000} target={200000} title="Q2 Revenue Target" />

            {/* Heatmap Chart */}
            <HeatmapChart data={sampleHeatmapData} title="Activity Heatmap (7x7)" />
          </div>

          {/* Feature Info */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-violet-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-violet-900 mb-2">
                  Powered by TraceRight 2.0 Figma Integration
                </h3>
                <p className="text-violet-700 mb-4">
                  All charts and AI features have been ported from the Figma-generated codebase.
                  These are production-ready components with full theme integration, responsive design,
                  and can be connected to Firebase/Firestore for real-time data.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Waterfall Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Treemap Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Scatter Plots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Radar Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Funnel Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Combination Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Stacked Area</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Gauge Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Bullet Charts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Heatmaps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">AI Analysis Panel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full" />
                    <span className="text-violet-800">Theme Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🚧 Coming Next (Phase 2)</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-semibold mb-2">Analytics Tools:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Pivot Table Builder (dynamic aggregations)</li>
                  <li>• Data Cleaning Tools (AI-powered)</li>
                  <li>• Template Library (9 industry templates)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Collaboration:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Live cursors & presence</li>
                  <li>• Comment threads with @mentions</li>
                  <li>• Activity feeds & permissions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panels */}
      <AIAnalysisPanel isOpen={aiPanelOpen} onClose={() => setAIPanelOpen(false)} />
      <PivotTableBuilder isOpen={pivotBuilderOpen} onClose={() => setPivotBuilderOpen(false)} />
      <DataCleaningTools isOpen={dataCleaningOpen} onClose={() => setDataCleaningOpen(false)} />
    </ThemeProvider>
  );
}
