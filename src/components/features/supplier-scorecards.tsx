'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
} from 'lucide-react';

import type { Supplier } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Global Imports',
    logo: 'supplier-logo-1',
    status: 'Active',
    performance: {
      onTimeDelivery: 98,
      qualityScore: 95,
      responseRate: 99,
    },
    history: [
      { month: 'Jan', onTime: 97, quality: 94 },
      { month: 'Feb', onTime: 99, quality: 95 },
      { month: 'Mar', onTime: 98, quality: 96 },
      { month: 'Apr', onTime: 97, quality: 94 },
      { month: 'May', onTime: 100, quality: 95 },
    ],
    documents: [{ name: 'MSA_2024.pdf', url: '#' }],
  },
  {
    id: 'SUP-002',
    name: 'Domestic Goods',
    logo: 'supplier-logo-2',
    status: 'Active',
    performance: {
      onTimeDelivery: 92,
      qualityScore: 88,
      responseRate: 95,
    },
    history: [
      { month: 'Jan', onTime: 90, quality: 85 },
      { month: 'Feb', onTime: 91, quality: 88 },
      { month: 'Mar', onTime: 93, quality: 89 },
      { month: 'Apr', onTime: 92, quality: 90 },
      { month: 'May', onTime: 94, quality: 88 },
    ],
    documents: [
      { name: 'SOW_Q2_2024.pdf', url: '#' },
      { name: 'Compliance_Cert.pdf', url: '#' },
    ],
  },
  {
    id: 'SUP-003',
    name: 'Rapid Logistics',
    logo: 'supplier-logo-3',
    status: 'On-hold',
    performance: {
      onTimeDelivery: 75,
      qualityScore: 80,
      responseRate: 85,
    },
    history: [
      { month: 'Jan', onTime: 80, quality: 82 },
      { month: 'Feb', onTime: 78, quality: 81 },
      { month: 'Mar', onTime: 70, quality: 79 },
      { month: 'Apr', onTime: 72, quality: 80 },
      { month: 'May', onTime: 75, quality: 78 },
    ],
    documents: [],
  },
];

const statusVariant = {
  Active: 'default',
  'On-hold': 'destructive',
  Inactive: 'secondary',
} as const;

export function SupplierScorecards() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>(
    MOCK_SUPPLIERS[0]
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>Select a supplier to view details.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-18rem)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SUPPLIERS.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    onClick={() => setSelectedSupplier(supplier)}
                    className={`cursor-pointer ${
                      selectedSupplier.id === supplier.id ? 'bg-muted' : ''
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              PlaceHolderImages.find(
                                (p) => p.id === supplier.logo
                              )?.imageUrl
                            }
                            alt={supplier.name}
                          />
                          <AvatarFallback>
                            {supplier.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{supplier.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[supplier.status]}>
                        {supplier.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  PlaceHolderImages.find(
                    (p) => p.id === selectedSupplier.logo
                  )?.imageUrl
                }
                alt={selectedSupplier.name}
              />
              <AvatarFallback>
                {selectedSupplier.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{selectedSupplier.name}</CardTitle>
              <CardDescription>{selectedSupplier.id}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      On-Time Delivery
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplier.performance.onTimeDelivery}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Quality Score
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplier.performance.qualityScore}/100
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Response Rate
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedSupplier.performance.responseRate}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <BarChart data={selectedSupplier.history}>
                      <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                        }}
                      />
                      <Bar
                        dataKey="onTime"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name="On-Time Delivery (%)"
                      />
                      <Bar
                        dataKey="quality"
                        fill="hsl(var(--accent))"
                        radius={[4, 4, 0, 0]}
                        name="Quality Score (/100)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSupplier.documents.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedSupplier.documents.map((doc) => (
                      <li key={doc.name}>
                        <Button
                          variant="ghost"
                          className="w-full justify-between"
                          asChild
                        >
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>{doc.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </a>
                        </Button>
                        <Separator />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No documents found.
                  </p>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
