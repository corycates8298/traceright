
'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Workflow,
  Zap,
  Shield,
  Brain,
  Database,
  GitBranch,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Globe,
  Cloud,
  Cpu,
  Network
} from 'lucide-react';
import { SankeyDiagram } from '@/components/charts/SankeyDiagram';
import { TreemapVisualization } from '@/components/charts/TreemapVisualization';
import { FunnelChart } from '@/components/charts/FunnelChart';


const features = [
  {
    title: 'AI-Powered Workflow Automation',
    description: 'Intelligent automation that learns from your operations and optimizes processes in real-time.',
    icon: Workflow,
    color: 'from-violet-500 to-purple-600',
    status: 'Active',
    benefits: [
      'Reduce manual tasks by 80%',
      'Smart task prioritization',
      'Self-optimizing workflows',
      'Predictive bottleneck detection'
    ]
  },
  {
    title: 'Google Sheets Integration',
    description: 'Seamlessly sync your supply chain data with Google Sheets for easy collaboration and reporting.',
    icon: Database,
    color: 'from-green-500 to-emerald-600',
    status: 'Active',
    benefits: [
      'Real-time bidirectional sync',
      'Familiar spreadsheet interface',
      'Team collaboration features',
      'Custom formula support'
    ]
  },
  {
    title: 'ACE Methodology Engine',
    description: 'Self-improving AI that gets smarter with every decision using Agentic Context Engineering.',
    icon: Brain,
    color: 'from-blue-500 to-cyan-600',
    status: 'Active',
    benefits: [
      'Learns from feedback',
      'Builds institutional knowledge',
      'Adapts to your business',
      'Continuous improvement'
    ]
  },
  {
    title: 'Real-Time Digital Twin',
    description: 'Live 3D visualization of your entire supply chain with predictive analytics.',
    icon: Cpu,
    color: 'from-orange-500 to-red-600',
    status: 'Enhanced',
    benefits: [
      'Interactive 3D modeling',
      'What-if scenario analysis',
      'Risk visualization',
      'Performance optimization'
    ]
  },
  {
    title: 'Multi-Cloud Integration',
    description: 'Connect with any cloud platform - AWS, Azure, GCP, and custom APIs.',
    icon: Cloud,
    color: 'from-pink-500 to-rose-600',
    status: 'Coming Soon',
    benefits: [
      'Vendor-agnostic architecture',
      'Unified data access',
      'Cross-platform analytics',
      'Seamless migration'
    ]
  },
  {
    title: 'Blockchain Supply Chain',
    description: 'Immutable tracking and verification of products from source to delivery.',
    icon: Shield,
    color: 'from-indigo-500 to-purple-600',
    status: 'Beta',
    benefits: [
      'Complete transparency',
      'Fraud prevention',
      'Smart contract automation',
      'Regulatory compliance'
    ]
  }
];

const statusColors = {
  'Active': 'bg-green-500',
  'Enhanced': 'bg-blue-500',
  'Beta': 'bg-yellow-500',
  'Coming Soon': 'bg-slate-400'
};

export default function NextGenFeaturesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Next-Gen Features" />
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-violet-600" />
              <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0">
                <Rocket className="h-3 w-3 mr-1" />
                Innovation Hub
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              The Future of Supply Chain Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              Experience cutting-edge features that combine AI, automation, and real-time intelligence
              to transform how you manage your supply chain. Built on the revolutionary ACE methodology
              for continuous improvement and institutional learning.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                <Zap className="h-4 w-4 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <SankeyDiagram />
            </div>
            <FunnelChart />
        </div>
        <TreemapVisualization />


        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-violet-600 mb-1">6</div>
              <div className="text-sm text-muted-foreground">Active Features</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-1">80%</div>
              <div className="text-sm text-muted-foreground">Time Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-1">Real-time</div>
              <div className="text-sm text-muted-foreground">Data Sync</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">AI Monitoring</div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <div className={`h-2 w-2 rounded-full ${statusColors[feature.status]}`} />
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>

              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
            </Card>
          ))}
        </div>

        {/* ACE Integration Callout */}
        <Card className="border-2 border-violet-500/50 bg-gradient-to-br from-violet-500/5 to-purple-500/5">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-6 w-6 text-violet-600" />
              <CardTitle className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Powered by ACE Methodology
              </CardTitle>
            </div>
            <CardDescription>
              All Next-Gen features are enhanced by our revolutionary Agentic Context Engineering framework
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <GitBranch className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Generator Agent</div>
                  <div className="text-xs text-muted-foreground">Executes optimized strategies</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Network className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Reflector Agent</div>
                  <div className="text-xs text-muted-foreground">Analyzes outcomes</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Curator Agent</div>
                  <div className="text-xs text-muted-foreground">Updates knowledge base</div>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
              <Brain className="h-4 w-4 mr-2" />
              Explore ACE Framework
            </Button>
          </CardContent>
        </Card>

        {/* Coming Soon Teaser */}
        <Card className="bg-slate-50 dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-orange-600" />
              On the Horizon
            </CardTitle>
            <CardDescription>Features currently in development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-background">
                <div className="font-semibold mb-1">IoT Integration</div>
                <div className="text-sm text-muted-foreground">Connect with sensors and devices</div>
              </div>
              <div className="p-4 rounded-lg border bg-background">
                <div className="font-semibold mb-1">Voice Commands</div>
                <div className="text-sm text-muted-foreground">Control your dashboard hands-free</div>
              </div>
              <div className="p-4 rounded-lg border bg-background">
                <div className="font-semibold mb-1">Mobile Apps</div>
                <div className="text-sm text-muted-foreground">Native iOS and Android apps</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
