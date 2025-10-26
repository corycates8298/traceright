'use client';

import { useMemo } from 'react';
import { useCollection, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Header } from '@/components/layout/header';
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
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

type Invoice = {
  id: string;
  orderId: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: any; // Firestore Timestamp
};

type Cost = {
  id: string;
  category: string;
  amount: number;
  date: any; // Firestore Timestamp
};

function getStatusVariant(status: Invoice['status']) {
  switch (status) {
    case 'Paid':
      return 'bg-green-500';
    case 'Pending':
      return 'bg-yellow-500 text-black';
    case 'Overdue':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export default function FinancialsPage() {
  const firestore = useFirestore();

  const invoicesQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'invoices'), orderBy('dueDate', 'desc'))
        : null,
    [firestore]
  );
  const { data: invoices, isLoading: isLoadingInvoices } =
    useCollection<Invoice>(invoicesQuery);

  const costsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'costs'), orderBy('date', 'desc'))
        : null,
    [firestore]
  );
  const { data: costs, isLoading: isLoadingCosts } = useCollection<Cost>(costsQuery);

  const costByCategory = useMemo(() => {
    if (!costs) return [];
    const summary = costs.reduce(
      (acc, cost) => {
        if (!acc[cost.category]) {
          acc[cost.category] = { name: cost.category, total: 0 };
        }
        acc[cost.category].total += cost.amount;
        return acc;
      },
      {} as Record<string, { name: string; total: number }>
    );
    return Object.values(summary);
  }, [costs]);

  const isLoading = isLoadingInvoices || isLoadingCosts;
  
  const chartConfig = {
    total: {
      label: 'Total Cost',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Financials" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>
                Track outstanding and paid invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingInvoices
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-16 ml-auto" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                          </TableCell>
                        </TableRow>
                      ))
                    : invoices?.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">
                            {invoice.id}
                          </TableCell>
                          <TableCell>{invoice.orderId}</TableCell>
                          <TableCell className="text-right">
                            ${invoice.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {invoice.dueDate?.toDate
                              ? format(invoice.dueDate.toDate(), 'PPP')
                              : 'N/A'}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className={`border-0 text-white ${getStatusVariant(
                                invoice.status
                              )}`}
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
              {!isLoadingInvoices && (!invoices || invoices.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                  No invoice data found. Try seeding the database in the Admin
                  panel.
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>Summary of costs by category.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoadingCosts ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                  <BarChart accessibilityLayer data={costByCategory} layout="vertical" margin={{ right: 20 }}>
                    <CartesianGrid horizontal={false} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <XAxis dataKey="total" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                      dataKey="total"
                      fill="var(--color-total)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              )}
              {!isLoadingCosts && (!costs || costs.length === 0) && (
                <div className="text-center flex items-center justify-center h-[300px] text-muted-foreground">
                  No cost data found.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
