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
import { type Order } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

function getStatusVariant(status: Order['status']) {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500';
    case 'In-Transit':
      return 'bg-blue-500';
    case 'Delayed':
      return 'bg-yellow-500 text-black';
    case 'Cancelled':
      return 'bg-red-500';
    case 'Processing':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
}

export default function OrdersPage() {
  const firestore = useFirestore();
  const ordersQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'orders'), orderBy('createdAt', 'desc')) : null),
    [firestore]
  );
  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Order Management" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              A complete list of all purchase, transfer, and sale orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  orders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-0 text-white ${getStatusVariant(order.status)}`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${order.totalValue.toFixed(2)}</TableCell>
                      <TableCell>
                        {order.createdAt?.toDate ? format(order.createdAt.toDate(), 'PPP') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {order.expectedDeliveryDate?.toDate ? format(order.expectedDeliveryDate.toDate(), 'PPP') : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {!isLoading && (!orders || orders.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                    No orders found. Try seeding the database in the Admin panel.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
