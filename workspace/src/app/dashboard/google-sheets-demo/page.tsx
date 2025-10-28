'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Download,
  Upload,
  Link2,
  Table,
  BarChart3,
  FileSpreadsheet,
  Zap,
  Users,
  Lock,
  Cloud
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockSheetData = [
  { id: 'SKU-001', product: 'Industrial Valve', stock: 245, reorder: 100, supplier: 'Acme Corp', status: 'In Stock' },
  { id: 'SKU-002', product: 'Hydraulic Pump', stock: 87, reorder: 150, supplier: 'Tech Industries', status: 'Low Stock' },
  { id: 'SKU-003', product: 'Steel Bearing', stock: 423, reorder: 200, supplier: 'Precision Parts', status: 'In Stock' },
  { id: 'SKU-004', product: 'Control Panel', stock: 34, reorder: 50, supplier: 'ElectroTech', status: 'Critical' },
  { id: 'SKU-005', product: 'Cable Assembly', stock: 567, reorder: 300, supplier: 'Wire Solutions', status: 'In Stock' },
];

const integrationFeatures = [
  {
    title: 'Bidirectional Sync',
    description: 'Changes in Sheets update TraceRight instantly, and vice versa',
    icon: RefreshCw,
    color: 'text-blue-600',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Team Collaboration',
    description: 'Share data with stakeholders who prefer spreadsheets',
    icon: Users,
    color: 'text-green-600',
    bg: 'bg-green-500/10'
  },
  {
    title: 'Custom Formulas',
    description: 'Use familiar spreadsheet formulas alongside AI insights',
    icon: Table,
    color: 'text-purple-600',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Secure Access',
    description: 'Enterprise-grade security with granular permissions',
    icon: Lock,
    color: 'text-orange-600',
    bg: 'bg-orange-500/10'
  }
];

const useCase = [
  {
    title: 'Finance Teams',
    description: 'Export financial data for budget analysis and reporting',
    icon: BarChart3
  },
  {
    title: 'Supply Chain',
    description: 'Collaborate with suppliers using shared inventory sheets',
    icon: Cloud
  },
  {
    title: 'Operations',
    description: 'Monitor production metrics in familiar spreadsheet format',
    icon: FileSpreadsheet
  }
];

export default function GoogleSheetsDemoPage() {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast({
        title: 'Connected!',
        description: 'Successfully connected to Google Sheets',
      });
    }, 2000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: 'Data Synced',
        description: 'All changes synchronized with Google Sheets',
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Google Sheets Integration" />
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sheet className="h-8 w-8 text-green-600" />
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                <Zap className="h-3 w-3 mr-1" />
                Live Integration
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Google Sheets Integration
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              Bridge the gap between powerful supply chain management and familiar spreadsheet tools.
              Keep your team productive while leveraging enterprise-grade automation and AI.
            </p>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl" />
        </div>

        {/* Connection Card */}
        <Card className={isConnected ? 'border-green-500/50 bg-green-500/5' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className={`h-5 w-5 ${isConnected ? 'text-green-600' : ''}`} />
              Connection Status
            </CardTitle>
            <CardDescription>
              {isConnected
                ? 'Your Google Sheets account is connected and syncing in real-time'
                : 'Connect your Google account to enable spreadsheet integration'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected ? (
              <div className="space-y-4">
                <div>
                  <Label>Google Sheets URL</Label>
                  <Input
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="font-mono text-sm"
                  />
                </div>
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  size="lg"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4 mr-2" />
                      Connect to Google Sheets
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-green-700 dark:text-green-400">Connected</div>
                    <div className="text-sm text-muted-foreground">Inventory Master Sheet</div>
                  </div>
                  <Button onClick={handleSync} disabled={isSyncing} variant="outline">
                    {isSyncing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Data */}
        {isConnected && (
          <Card>
            <CardHeader>
              <CardTitle>Live Data Preview</CardTitle>
              <CardDescription>Current inventory data synced from Google Sheets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">SKU</th>
                      <th className="text-left p-3 font-semibold">Product</th>
                      <th className="text-right p-3 font-semibold">Stock</th>
                      <th className="text-right p-3 font-semibold">Reorder Point</th>
                      <th className="text-left p-3 font-semibold">Supplier</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSheetData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                        <td className="p-3 font-mono text-sm">{row.id}</td>
                        <td className="p-3">{row.product}</td>
                        <td className="p-3 text-right">{row.stock}</td>
                        <td className="p-3 text-right">{row.reorder}</td>
                        <td className="p-3">{row.supplier}</td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className={
                              row.status === 'In Stock' ? 'border-green-500 text-green-700' :
                              row.status === 'Low Stock' ? 'border-yellow-500 text-yellow-700' :
                              'border-red-500 text-red-700'
                            }
                          >
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Real-time Sync:</strong> Any changes made in Google Sheets will appear here within seconds.
                    Similarly, updates in TraceRight automatically sync to your spreadsheet.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Integration Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationFeatures.map((feature, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Perfect For</CardTitle>
            <CardDescription>Who benefits from Google Sheets integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCase.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4">
                  <div className="p-4 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-3">
                    <item.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Set up your Google Sheets integration in 3 easy steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Connect Your Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Authorize TraceRight to access your Google Sheets with secure OAuth 2.0
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Select Your Spreadsheet</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose an existing sheet or create a new one from our templates
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Start Syncing</h4>
                  <p className="text-sm text-muted-foreground">
                    Data flows automatically in both directions - make changes anywhere
                  </p>
                </div>
              </div>

              {!isConnected && (
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  size="lg"
                >
                  Begin Setup
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
