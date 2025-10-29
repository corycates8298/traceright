
'use client';

import { useState } from 'react';
import { useFeatureFlags } from './FeatureFlagsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle2, XCircle, Search, Download, Upload, RotateCcw,
  Power, PowerOff, Truck, Factory, Brain, Shield, Sparkles,
  BarChart3, Layers, Zap, Package, Book, Users, Settings
} from 'lucide-react';

const featureCategories = [
  {
    name: 'Core Logistics',
    icon: Truck,
    features: [
      { key: 'logistics' as const, name: 'Logistics', description: 'Main logistics management' },
      { key: 'suppliers' as const, name: 'Suppliers', description: 'Supplier management' },
      { key: 'purchaseOrders' as const, name: 'Purchase Orders', description: 'PO tracking' },
      { key: 'inboundReceipts' as const, name: 'Inbound Receipts', description: 'Receiving operations' },
      { key: 'warehouseOps' as const, name: 'Warehouse Operations', description: 'Warehouse management' },
      { key: 'outboundShipments' as const, name: 'Outbound Shipments', description: 'Shipping operations' },
    ],
  },
  {
    name: 'Production',
    icon: Factory,
    features: [
      { key: 'rawMaterials' as const, name: 'Raw Materials', description: 'Material management' },
      { key: 'recipes' as const, name: 'Recipes', description: 'Production recipes' },
      { key: 'batches' as const, name: 'Batches', description: 'Batch tracking' },
    ],
  },
  {
    name: 'Intelligence',
    icon: Brain,
    features: [
      { key: 'traceability' as const, name: 'Traceability', description: 'Digital twin traceability' },
      { key: 'aiReporting' as const, name: 'AI Reporting', description: 'Automated reporting' },
      { key: 'aiForecast' as const, name: 'AI Forecasting', description: 'Demand forecasting' },
      { key: 'materialsIntel' as const, name: 'Materials Intelligence', description: 'Material insights' },
      { key: 'mlIntelligence' as const, name: 'ML Intelligence', description: 'Machine learning features' },
    ],
  },
  {
    name: 'System',
    icon: Shield,
    features: [
      { key: 'administration' as const, name: 'Administration', description: 'Admin panel' },
      { key: 'governance' as const, name: 'Governance', description: 'Governance tools' },
      { key: 'about' as const, name: 'About', description: 'About information' },
    ],
  },
  {
    name: 'SHOWCASE',
    icon: Sparkles,
    features: [
      { key: 'showcaseVisualization' as const, name: '✨ Next-Gen Features', description: 'Innovation showcase' },
      { key: 'showcaseSheets' as const, name: '📊 Google Sheets Demo', description: 'Sheets integration' },
    ],
  },
  {
    name: 'Dashboard',
    icon: Layers,
    features: [
      { key: 'dashboard3D' as const, name: 'Dashboard 3D', description: '3D visualization' },
      { key: 'dashboardCyberpunk' as const, name: 'Black Reports', description: 'Terminal interface' },
      { key: 'dashboardBuilder' as const, name: 'Dashboard Builder', description: 'Custom dashboards' },
      { key: 'aiVision' as const, name: 'AI Vision', description: 'Visual inspection' },
    ],
  },
  {
    name: 'Panels',
    icon: Settings,
    features: [
      { key: 'aiAnalysis' as const, name: 'AI Analysis', description: 'AI-powered analysis' },
      { key: 'collaboration' as const, name: 'Collaboration', description: 'Team collaboration' },
      { key: 'dataCleaningTools' as const, name: 'Data Cleaning', description: 'Data quality tools' },
      { key: 'pivotTables' as const, name: 'Pivot Tables', description: 'Data pivoting' },
      { key: 'templateLibrary' as const, name: 'Template Library', description: 'Templates' },
      { key: 'themeCustomizer' as const, name: 'Theme Customizer', description: 'Visual theming' },
    ],
  },
  {
    name: 'Widgets',
    icon: Package,
    features: [
      { key: 'widgetKPI' as const, name: 'KPI Widget', description: 'Key metrics' },
      { key: 'widgetSalesChart' as const, name: 'Sales Chart', description: 'Sales visualization' },
      { key: 'widgetRevenueChart' as const, name: 'Revenue Chart', description: 'Revenue tracking' },
      { key: 'widgetInventory' as const, name: 'Inventory Widget', description: 'Inventory status' },
      { key: 'widgetOrders' as const, name: 'Orders Widget', description: 'Order tracking' },
      { key: 'widgetProducts' as const, name: 'Products Widget', description: 'Product info' },
      { key: 'widgetPerformance' as const, name: 'Performance Widget', description: 'Performance metrics' },
      { key: 'widgetCustomChart' as const, name: 'Custom Chart', description: 'Custom visualizations' },
    ],
  },
  {
    name: 'Charts',
    icon: BarChart3,
    features: [
      { key: 'chartBar' as const, name: 'Bar Chart', description: 'Bar visualizations' },
      { key: 'chartLine' as const, name: 'Line Chart', description: 'Line graphs' },
      { key: 'chartPie' as const, name: 'Pie Chart', description: 'Pie charts' },
      { key: 'chartArea' as const, name: 'Area Chart', description: 'Area graphs' },
      { key: 'chartRadar' as const, name: 'Radar Chart', description: 'Radar diagrams' },
      { key: 'chartScatter' as const, name: 'Scatter Plot', description: 'Scatter plots' },
      { key: 'chartTreemap' as const, name: 'Treemap', description: 'Hierarchical data' },
      { key: 'chartSankey' as const, name: 'Sankey Diagram', description: 'Flow diagrams' },
      { key: 'chartFunnel' as const, name: 'Funnel Chart', description: 'Conversion funnels' },
      { key: 'chartGauge' as const, name: 'Gauge Chart', description: 'Gauge visualizations' },
      { key: 'chartWaterfall' as const, name: 'Waterfall Chart', description: 'Waterfall analysis' },
      { key: 'chartBullet' as const, name: 'Bullet Chart', description: 'Performance bullets' },
      { key: 'chartHeatmap' as const, name: 'Heatmap', description: 'Heat visualizations' },
    ],
  },
  {
    name: 'Advanced',
    icon: Zap,
    features: [
      { key: 'advancedCharts' as const, name: 'Advanced Charts', description: 'Complex visualizations' },
      { key: 'realTimeUpdates' as const, name: 'Real-time Updates', description: 'Live data sync' },
      { key: 'exportData' as const, name: 'Export Data', description: 'Data export tools' },
      { key: 'notifications' as const, name: 'Notifications', description: 'System notifications' },
    ],
  },
];

export function FeatureFlagsManager() {
  const { flags, isEnabled, toggleFeature, enableAll, disableAll, resetFlags, exportConfig, importConfig } = useFeatureFlags();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [importJson, setImportJson] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleExport = () => {
    const config = exportConfig();
    navigator.clipboard.writeText(config);
    toast({
      title: 'Configuration Exported',
      description: 'Copied to clipboard!',
    });
  };

  const handleImport = () => {
    try {
      importConfig(importJson);
      toast({
        title: 'Configuration Imported',
        description: 'Feature flags updated successfully',
      });
      setShowImport(false);
      setImportJson('');
    } catch (e) {
      toast({
        title: 'Import Failed',
        description: 'Invalid JSON configuration',
        variant: 'destructive',
      });
    }
  };

  const filteredCategories = featureCategories.map(category => ({
    ...category,
    features: category.features.filter(
      f => f.name.toLowerCase().includes(search.toLowerCase()) ||
           f.description.toLowerCase().includes(search.toLowerCase()) ||
           f.key.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(category => category.features.length > 0);

  const enabledCount = Object.values(flags).filter(Boolean).length;
  const totalCount = Object.keys(flags).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{enabledCount}</div>
            <div className="text-sm text-muted-foreground">Features Enabled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-600">{totalCount - enabledCount}</div>
            <div className="text-sm text-muted-foreground">Features Disabled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-muted-foreground">Total Features</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-violet-600">{featureCategories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Controls</CardTitle>
          <CardDescription>Manage feature flags across the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={enableAll} className="bg-green-600 hover:bg-green-700">
              <Power className="h-4 w-4 mr-2" />
              Enable All
            </Button>
            <Button onClick={disableAll} variant="destructive">
              <PowerOff className="h-4 w-4 mr-2" />
              Disable All
            </Button>
            <Button onClick={resetFlags} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleExport} variant="outline" className="bg-blue-50 dark:bg-blue-950">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowImport(!showImport)} variant="outline" className="bg-purple-50 dark:bg-purple-950">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>

          {/* Import Section */}
          {showImport && (
            <div className="space-y-2 p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <Input
                placeholder="Paste JSON configuration..."
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                className="font-mono text-sm"
              />
              <Button onClick={handleImport} className="w-full">
                Import Configuration
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Categories */}
      {filteredCategories.map((category) => (
        <Card key={category.name}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <category.icon className="h-5 w-5" />
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.features.map((feature) => {
                const enabled = isEnabled(feature.key);
                return (
                  <div
                    key={feature.key}
                    onClick={() => toggleFeature(feature.key)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      enabled
                        ? 'border-green-500 bg-gradient-to-br from-green-500/10 to-green-600/5 opacity-100'
                        : 'border-red-500 bg-gradient-to-br from-red-500/10 to-red-600/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      {enabled ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <Switch
                        checked={enabled}
                        onCheckedChange={() => toggleFeature(feature.key)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={enabled ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}
                      >
                        {enabled ? 'ENABLED' : 'DISABLED'}
                      </Badge>
                      <code className="text-xs text-muted-foreground">{feature.key}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
