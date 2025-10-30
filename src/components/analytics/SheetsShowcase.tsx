import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  FileSpreadsheet,
  Sparkles,
  Users,
  Wand2,
  BarChart3,
  Table2,
  CleaningServices,
  MessageSquare,
  Play,
  Download,
  Share2,
  Plus,
  X,
  Check,
  AlertCircle,
  TrendingUp,
  Brain,
  Zap,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  FunnelChart,
  Funnel
} from 'recharts';

// Sample Spreadsheet Data
const spreadsheetData = [
  { A: 'Product', B: 'Q1 Sales', C: 'Q2 Sales', D: 'Q3 Sales', E: 'Q4 Sales', F: 'Total', G: 'Trend' },
  { A: 'Laptops', B: '45000', C: '52000', D: '48000', E: '61000', F: '=SUM(B2:E2)', G: '↗ +15%' },
  { A: 'Phones', B: '38000', C: '42000', D: '45000', E: '49000', F: '=SUM(B3:E3)', G: '↗ +12%' },
  { A: 'Tablets', B: '22000', C: '25000', D: '23000', E: '28000', F: '=SUM(B4:E4)', G: '↗ +10%' },
  { A: 'Accessories', B: '15000', C: '18000', D: '21000', E: '24000', F: '=SUM(B5:E5)', G: '↗ +18%' },
  { A: 'Total', B: '=SUM(B2:B5)', C: '=SUM(C2:C5)', D: '=SUM(D2:D5)', E: '=SUM(E2:E5)', F: '=SUM(F2:F5)', G: '' },
];

// Chart Data
const salesChartData = [
  { quarter: 'Q1', Laptops: 45000, Phones: 38000, Tablets: 22000, Accessories: 15000 },
  { quarter: 'Q2', Laptops: 52000, Phones: 42000, Tablets: 25000, Accessories: 18000 },
  { quarter: 'Q3', Laptops: 48000, Phones: 45000, Tablets: 23000, Accessories: 21000 },
  { quarter: 'Q4', Laptops: 61000, Phones: 49000, Tablets: 28000, Accessories: 24000 },
];

const pieChartData = [
  { name: 'Laptops', value: 206000, fill: '#8b5cf6' },
  { name: 'Phones', value: 174000, fill: '#3b82f6' },
  { name: 'Tablets', value: 98000, fill: '#10b981' },
  { name: 'Accessories', value: 78000, fill: '#f59e0b' },
];

const radarData = [
  { metric: 'Quality', A: 85, B: 90 },
  { metric: 'Price', A: 78, B: 82 },
  { metric: 'Support', A: 92, B: 88 },
  { metric: 'Features', A: 88, B: 85 },
  { metric: 'Reliability', A: 95, B: 93 },
];

const funnelData = [
  { stage: 'Leads', value: 1000, fill: '#8b5cf6' },
  { stage: 'Qualified', value: 750, fill: '#7c3aed' },
  { stage: 'Proposal', value: 500, fill: '#6d28d9' },
  { stage: 'Negotiation', value: 300, fill: '#5b21b6' },
  { stage: 'Closed', value: 180, fill: '#4c1d95' },
];

// AI Analysis Results
const aiInsights = [
  { type: 'trend', title: 'Strong Q4 Performance', description: 'All product categories showed growth in Q4, with Laptops leading at 27% increase over Q3.', confidence: 98 },
  { type: 'anomaly', title: 'Tablets Dip in Q3', description: 'Tablet sales decreased 8% in Q3, likely seasonal. Recommend targeted marketing campaign.', confidence: 87 },
  { type: 'recommendation', title: 'Inventory Optimization', description: 'Based on trends, increase Laptop inventory by 20% and Accessories by 25% for next quarter.', confidence: 92 },
  { type: 'prediction', title: 'Q1 Forecast', description: 'Predicted Q1 sales: Laptops $64K, Phones $52K, Tablets $30K, Accessories $27K (Total: $173K)', confidence: 85 },
];

// Data Quality Issues
const dataIssues = [
  { type: 'duplicate', description: 'Found 3 duplicate entries in customer database', severity: 'medium', auto_fixable: true },
  { type: 'missing', description: '12 records missing required email addresses', severity: 'high', auto_fixable: false },
  { type: 'format', description: 'Inconsistent phone number formats (5 different patterns)', severity: 'low', auto_fixable: true },
  { type: 'outlier', description: '2 sales values exceed 3 standard deviations', severity: 'medium', auto_fixable: false },
];

// Collaboration Activity
const activities = [
  { user: 'Sarah Chen', action: 'edited cell B4', time: '2 minutes ago', avatar: 'SC' },
  { user: 'Mike Johnson', action: 'added comment', time: '5 minutes ago', avatar: 'MJ' },
  { user: 'Lisa Wang', action: 'created pivot table', time: '12 minutes ago', avatar: 'LW' },
  { user: 'Tom Brown', action: 'shared with team', time: '18 minutes ago', avatar: 'TB' },
];

// Templates
const templates = [
  { id: 1, name: 'Sales Dashboard', category: 'Sales', icon: '📊', description: 'Track revenue, conversion, and team performance' },
  { id: 2, name: 'Inventory Manager', category: 'Operations', icon: '📦', description: 'Monitor stock levels, reorder points, turnover' },
  { id: 3, name: 'Financial Report', category: 'Finance', icon: '💰', description: 'P&L, balance sheet, cash flow analysis' },
  { id: 4, name: 'Project Tracker', category: 'Operations', icon: '✅', description: 'Task management, timelines, resource allocation' },
  { id: 5, name: 'Customer Analytics', category: 'Sales', icon: '👥', description: 'Acquisition, retention, lifetime value metrics' },
  { id: 6, name: 'Supply Chain KPIs', category: 'Operations', icon: '🚚', description: 'On-time delivery, quality, supplier performance' },
];

export function SheetsShowcase() {
  const [activeTab, setActiveTab] = useState('spreadsheet');
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [showAiResults, setShowAiResults] = useState(false);
  const [scanningData, setScanningData] = useState(false);
  const [issuesFixed, setIssuesFixed] = useState<number[]>([]);

  const handleScanData = () => {
    setScanningData(true);
    setTimeout(() => setScanningData(false), 2000);
  };

  const handleFixIssue = (index: number) => {
    setIssuesFixed([...issuesFixed, index]);
  };

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 text-4xl">Google Sheets Integration</h1>
                <p className="text-slate-600">Enterprise-grade spreadsheet features for data analysis</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-green-200">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="spreadsheet">
              <Table2 className="w-4 h-4 mr-2" />
              Spreadsheet
            </TabsTrigger>
            <TabsTrigger value="ai-analysis">
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="charts">
              <BarChart3 className="w-4 h-4 mr-2" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="pivot">
              <Table2 className="w-4 h-4 mr-2" />
              Pivot Tables
            </TabsTrigger>
            <TabsTrigger value="data-quality">
              <Wand2 className="w-4 h-4 mr-2" />
              Data Cleaning
            </TabsTrigger>
            <TabsTrigger value="collaborate">
              <Users className="w-4 h-4 mr-2" />
              Collaborate
            </TabsTrigger>
          </TabsList>

          {/* SPREADSHEET TAB */}
          <TabsContent value="spreadsheet" className="space-y-4">
            <Card className="p-6 border-green-200 bg-white/80 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-slate-900 text-xl">Sales Data Q1-Q4 2024</h3>
                  {selectedCell && (
                    <Badge className="bg-green-600 text-white">
                      Selected: {selectedCell}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Row
                  </Button>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Column
                  </Button>
                </div>
              </div>

              {/* Spreadsheet Grid */}
              <div className="border-2 border-green-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-green-100">
                        <TableHead className="w-12 text-center border-r border-green-200">#</TableHead>
                        {columns.map((col) => (
                          <TableHead key={col} className="text-center border-r border-green-200 font-mono">
                            {col}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {spreadsheetData.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className={rowIndex === 0 ? 'bg-green-50' : ''}>
                          <TableCell className="text-center border-r border-green-200 bg-green-50 font-mono">
                            {rowIndex + 1}
                          </TableCell>
                          {columns.map((col) => {
                            const cellValue = row[col as keyof typeof row];
                            const cellId = `${col}${rowIndex + 1}`;
                            const isFormula = typeof cellValue === 'string' && cellValue.startsWith('=');
                            const isHeader = rowIndex === 0;
                            const isTotal = rowIndex === spreadsheetData.length - 1 || col === 'F';
                            
                            return (
                              <TableCell
                                key={col}
                                className={`border-r border-green-200 cursor-pointer hover:bg-green-50 transition-colors ${
                                  selectedCell === cellId ? 'bg-green-100 ring-2 ring-green-500' : ''
                                } ${isHeader ? 'font-semibold' : ''} ${isTotal && !isHeader ? 'bg-green-50 font-semibold' : ''}`}
                                onClick={() => setSelectedCell(cellId)}
                              >
                                {isFormula ? (
                                  <span className="text-green-700 font-mono text-sm">{cellValue}</span>
                                ) : (
                                  <span className={isHeader ? 'text-slate-900' : 'text-slate-700'}>
                                    {cellValue}
                                  </span>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Formula Bar */}
              {selectedCell && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-slate-600 font-mono">{selectedCell}:</div>
                    <Input 
                      value="=SUM(B2:E2)" 
                      className="flex-1 font-mono text-sm border-green-300"
                      placeholder="Enter formula or value..."
                    />
                    <Button size="sm" className="bg-green-600 text-white">
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span>Smart formulas with auto-complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span>Real-time calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Dynamic charts & pivot tables</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Ask AI</h4>
                    <p className="text-xs text-slate-600">Natural language analysis</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Create Chart</h4>
                    <p className="text-xs text-slate-600">15+ visualization types</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Table2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Pivot Table</h4>
                    <p className="text-xs text-slate-600">Dynamic data analysis</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* AI ANALYSIS TAB */}
          <TabsContent value="ai-analysis" className="space-y-4">
            <Card className="p-6 border-blue-200 bg-white/80 backdrop-blur">
              <div className="mb-6">
                <h3 className="text-slate-900 text-2xl mb-2">AI-Powered Data Analysis</h3>
                <p className="text-slate-600">Ask questions in plain English and get instant insights</p>
              </div>

              {/* AI Query Input */}
              <div className="mb-6">
                <div className="flex gap-3">
                  <Textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask anything about your data... e.g., 'What were our best selling products?' or 'Show me sales trends'"
                    className="flex-1 min-h-[100px] border-blue-300"
                  />
                  <Button
                    onClick={() => setShowAiResults(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                </div>
                
                {/* Quick Prompts */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    What are the top trends?
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Find anomalies in the data
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Predict next quarter
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Compare products
                  </Badge>
                </div>
              </div>

              {/* AI Insights */}
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-lg border-2 ${
                      insight.type === 'trend' ? 'border-green-200 bg-green-50' :
                      insight.type === 'anomaly' ? 'border-yellow-200 bg-yellow-50' :
                      insight.type === 'recommendation' ? 'border-blue-200 bg-blue-50' :
                      'border-purple-200 bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          insight.type === 'trend' ? 'bg-green-600' :
                          insight.type === 'anomaly' ? 'bg-yellow-600' :
                          insight.type === 'recommendation' ? 'bg-blue-600' :
                          'bg-purple-600'
                        }`}>
                          {insight.type === 'trend' && <TrendingUp className="w-4 h-4 text-white" />}
                          {insight.type === 'anomaly' && <AlertCircle className="w-4 h-4 text-white" />}
                          {insight.type === 'recommendation' && <Sparkles className="w-4 h-4 text-white" />}
                          {insight.type === 'prediction' && <Brain className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <h4 className="text-slate-900 font-semibold">{insight.title}</h4>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">{insight.type}</p>
                        </div>
                      </div>
                      <Badge className={`${
                        insight.confidence >= 90 ? 'bg-green-600' :
                        insight.confidence >= 80 ? 'bg-blue-600' :
                        'bg-yellow-600'
                      } text-white`}>
                        {insight.confidence}% Confidence
                      </Badge>
                    </div>
                    <p className="text-slate-700 ml-11">{insight.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* CHARTS TAB */}
          <TabsContent value="charts" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Bar Chart */}
              <Card className="p-6 border-purple-200 bg-white/80 backdrop-blur">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-lg">Quarterly Sales by Product</h3>
                    <Badge className="bg-purple-600 text-white">Bar Chart</Badge>
                  </div>
                  <p className="text-slate-600 text-sm">Compare product performance across quarters</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesChartData}>
                    <XAxis dataKey="quarter" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Laptops" fill="#8b5cf6" />
                    <Bar dataKey="Phones" fill="#3b82f6" />
                    <Bar dataKey="Tablets" fill="#10b981" />
                    <Bar dataKey="Accessories" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Pie Chart */}
              <Card className="p-6 border-blue-200 bg-white/80 backdrop-blur">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-lg">Sales Distribution</h3>
                    <Badge className="bg-blue-600 text-white">Pie Chart</Badge>
                  </div>
                  <p className="text-slate-600 text-sm">Total sales breakdown by category</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${((entry.value / 556000) * 100).toFixed(1)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Line Chart */}
              <Card className="p-6 border-green-200 bg-white/80 backdrop-blur">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-lg">Sales Trend</h3>
                    <Badge className="bg-green-600 text-white">Line Chart</Badge>
                  </div>
                  <p className="text-slate-600 text-sm">Track performance over time</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesChartData}>
                    <XAxis dataKey="quarter" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Laptops" stroke="#8b5cf6" strokeWidth={3} />
                    <Line type="monotone" dataKey="Phones" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Radar Chart */}
              <Card className="p-6 border-orange-200 bg-white/80 backdrop-blur">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-lg">Performance Metrics</h3>
                    <Badge className="bg-orange-600 text-white">Radar Chart</Badge>
                  </div>
                  <p className="text-slate-600 text-sm">Multi-dimensional comparison</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="metric" stroke="#64748b" />
                    <PolarRadiusAxis stroke="#64748b" />
                    <Radar name="Product A" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    <Radar name="Product B" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Chart Library Info */}
            <Card className="p-6 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
              <h3 className="text-slate-900 text-xl mb-4">15+ Chart Types Available</h3>
              <div className="grid grid-cols-5 gap-3">
                {['Bar', 'Line', 'Pie', 'Radar', 'Scatter', 'Funnel', 'Treemap', 'Waterfall', 'Gauge', 'Bullet', 'Heatmap', 'Combo', 'Area', 'Sankey', 'Bubble'].map((chart) => (
                  <Badge key={chart} variant="outline" className="border-cyan-600 text-cyan-700 justify-center py-2">
                    {chart}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* PIVOT TAB */}
          <TabsContent value="pivot" className="space-y-4">
            <Card className="p-6 border-indigo-200 bg-white/80 backdrop-blur">
              <div className="mb-6">
                <h3 className="text-slate-900 text-2xl mb-2">Pivot Table Builder</h3>
                <p className="text-slate-600">Drag and drop fields to create dynamic analysis</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Field List */}
                <Card className="p-4 bg-slate-50 border-slate-200">
                  <h4 className="text-slate-900 mb-3">Available Fields</h4>
                  <div className="space-y-2">
                    {['Product', 'Quarter', 'Sales', 'Region', 'Category', 'Revenue'].map((field) => (
                      <div
                        key={field}
                        className="p-2 bg-white border border-slate-300 rounded cursor-move hover:border-indigo-500 hover:shadow transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                          <span className="text-sm text-slate-700">{field}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Configuration */}
                <Card className="p-4 bg-indigo-50 border-indigo-200 col-span-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-slate-900 mb-2">Rows</h4>
                      <div className="p-3 bg-white border-2 border-dashed border-indigo-300 rounded min-h-[60px]">
                        <Badge className="bg-indigo-600 text-white">Product</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-slate-900 mb-2">Columns</h4>
                      <div className="p-3 bg-white border-2 border-dashed border-indigo-300 rounded min-h-[60px]">
                        <Badge className="bg-indigo-600 text-white">Quarter</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-slate-900 mb-2">Values</h4>
                      <div className="p-3 bg-white border-2 border-dashed border-indigo-300 rounded min-h-[60px] flex items-center gap-2">
                        <Badge className="bg-indigo-600 text-white">SUM(Sales)</Badge>
                        <select className="text-xs border rounded px-2 py-1">
                          <option>SUM</option>
                          <option>AVG</option>
                          <option>COUNT</option>
                          <option>MIN</option>
                          <option>MAX</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Pivot Result */}
              <div className="border-2 border-indigo-200 rounded-lg p-4 bg-indigo-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-slate-900">Pivot Table Result</h4>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Create Chart
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-100">
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Q1</TableHead>
                      <TableHead className="text-right">Q2</TableHead>
                      <TableHead className="text-right">Q3</TableHead>
                      <TableHead className="text-right">Q4</TableHead>
                      <TableHead className="text-right font-bold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Laptops</TableCell>
                      <TableCell className="text-right">$45,000</TableCell>
                      <TableCell className="text-right">$52,000</TableCell>
                      <TableCell className="text-right">$48,000</TableCell>
                      <TableCell className="text-right">$61,000</TableCell>
                      <TableCell className="text-right font-bold">$206,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phones</TableCell>
                      <TableCell className="text-right">$38,000</TableCell>
                      <TableCell className="text-right">$42,000</TableCell>
                      <TableCell className="text-right">$45,000</TableCell>
                      <TableCell className="text-right">$49,000</TableCell>
                      <TableCell className="text-right font-bold">$174,000</TableCell>
                    </TableRow>
                    <TableRow className="bg-indigo-50 font-bold">
                      <TableCell>Grand Total</TableCell>
                      <TableCell className="text-right">$83,000</TableCell>
                      <TableCell className="text-right">$94,000</TableCell>
                      <TableCell className="text-right">$93,000</TableCell>
                      <TableCell className="text-right">$110,000</TableCell>
                      <TableCell className="text-right">$380,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* DATA QUALITY TAB */}
          <TabsContent value="data-quality" className="space-y-4">
            <Card className="p-6 border-orange-200 bg-white/80 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 text-2xl mb-2">Data Quality Scanner</h3>
                  <p className="text-slate-600">AI-powered detection and auto-fix capabilities</p>
                </div>
                <Button
                  onClick={handleScanData}
                  disabled={scanningData}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white"
                >
                  {scanningData ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Start Scan
                    </>
                  )}
                </Button>
              </div>

              {/* Issues List */}
              <div className="space-y-3">
                {dataIssues.map((issue, index) => {
                  const isFixed = issuesFixed.includes(index);
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isFixed
                          ? 'border-green-200 bg-green-50'
                          : issue.severity === 'high'
                          ? 'border-red-200 bg-red-50'
                          : issue.severity === 'medium'
                          ? 'border-yellow-200 bg-yellow-50'
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isFixed
                              ? 'bg-green-600'
                              : issue.severity === 'high'
                              ? 'bg-red-600'
                              : issue.severity === 'medium'
                              ? 'bg-yellow-600'
                              : 'bg-blue-600'
                          }`}>
                            {isFixed ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-slate-900 capitalize">{issue.type}</h4>
                              <Badge variant="outline" className={
                                issue.severity === 'high' ? 'border-red-600 text-red-700' :
                                issue.severity === 'medium' ? 'border-yellow-600 text-yellow-700' :
                                'border-blue-600 text-blue-700'
                              }>
                                {issue.severity}
                              </Badge>
                              {issue.auto_fixable && !isFixed && (
                                <Badge className="bg-green-600 text-white text-xs">Auto-fixable</Badge>
                              )}
                            </div>
                            <p className="text-slate-700 text-sm">{issue.description}</p>
                            {isFixed && (
                              <p className="text-green-700 text-sm mt-2 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Issue resolved successfully
                              </p>
                            )}
                          </div>
                        </div>
                        {!isFixed && issue.auto_fixable && (
                          <Button
                            size="sm"
                            onClick={() => handleFixIssue(index)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          >
                            <Wand2 className="w-3 h-3 mr-1" />
                            Auto-Fix
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-2xl text-slate-900">{dataIssues.length}</div>
                      <div className="text-xs text-slate-600">Issues Found</div>
                    </div>
                    <div>
                      <div className="text-2xl text-green-600">{issuesFixed.length}</div>
                      <div className="text-xs text-slate-600">Fixed</div>
                    </div>
                    <div>
                      <div className="text-2xl text-orange-600">{dataIssues.length - issuesFixed.length}</div>
                      <div className="text-xs text-slate-600">Remaining</div>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* COLLABORATION TAB */}
          <TabsContent value="collaborate" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Active Users */}
              <Card className="p-6 border-purple-200 bg-white/80 backdrop-blur">
                <div className="mb-4">
                  <h3 className="text-slate-900 text-xl mb-2">Active Collaborators</h3>
                  <p className="text-slate-600 text-sm">4 people are currently viewing</p>
                </div>
                <div className="space-y-3">
                  {['Sarah Chen', 'Mike Johnson', 'Lisa Wang', 'Tom Brown'].map((name, index) => {
                    const initials = name.split(' ').map(n => n[0]).join('');
                    const colors = ['bg-purple-600', 'bg-blue-600', 'bg-green-600', 'bg-orange-600'];
                    return (
                      <div key={name} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className={`w-10 h-10 ${colors[index]} rounded-full flex items-center justify-center text-white`}>
                          {initials}
                        </div>
                        <div className="flex-1">
                          <div className="text-slate-900">{name}</div>
                          <div className="text-xs text-slate-600">Editor • Active now</div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Activity Feed */}
              <Card className="p-6 border-blue-200 bg-white/80 backdrop-blur">
                <div className="mb-4">
                  <h3 className="text-slate-900 text-xl mb-2">Recent Activity</h3>
                  <p className="text-slate-600 text-sm">Track all changes in real-time</p>
                </div>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                        {activity.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Comments */}
            <Card className="p-6 border-green-200 bg-white/80 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-slate-900 text-xl mb-2">Comments</h3>
                  <p className="text-slate-600 text-sm">Discuss specific cells or data points</p>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                      SC
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-900 font-semibold">Sarah Chen</span>
                        <span className="text-xs text-slate-500">Cell B4 • 10 minutes ago</span>
                      </div>
                      <p className="text-slate-700 text-sm">
                        These Q3 numbers look low for tablets. Should we investigate the seasonal dip?
                      </p>
                    </div>
                  </div>
                  <div className="ml-11 pl-4 border-l-2 border-green-300">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                        MJ
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-slate-900 font-semibold text-sm">Mike Johnson</span>
                          <span className="text-xs text-slate-500">5 minutes ago</span>
                        </div>
                        <p className="text-slate-700 text-sm">
                          Good catch! Back-to-school season typically favors laptops. Let's plan a tablet promotion for Q4.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Template Library Preview */}
        <Card className="p-6 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
          <div className="mb-6">
            <h3 className="text-slate-900 text-2xl mb-2">Dashboard Templates</h3>
            <p className="text-slate-600">Professional templates ready to use</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-5 bg-white border-2 border-teal-200 rounded-lg hover:shadow-lg hover:border-teal-400 transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-3">{template.icon}</div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-slate-900 group-hover:text-teal-600 transition-colors">
                    {template.name}
                  </h4>
                  <Badge variant="outline" className="border-teal-600 text-teal-700 text-xs">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">{template.description}</p>
                <Button size="sm" variant="outline" className="w-full group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600">
                  Use Template
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
