
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

type Batch = {
  id: string;
  productId: string;
  status: 'Scheduled' | 'In-Progress' | 'Completed' | 'Failed';
  startTime: any; // Firestore Timestamp
  endTime: any; // Firestore Timestamp
  quantityProduced: number;
};

function getStatusVariant(status: Batch['status']) {
  switch (status) {
    case 'Completed':
      return 'bg-green-500';
    case 'In-Progress':
      return 'bg-blue-500';
    case 'Scheduled':
      return 'bg-gray-500';
    case 'Failed':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export default function BatchesPage() {
  const firestore = useFirestore();

  const batchesQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'batches'), orderBy('startTime', 'desc'))
        : null,
    [firestore]
  );
  const { data: batches, isLoading } = useCollection<Batch>(batchesQuery);

  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products') : null),
    [firestore]
  );
  const { data: products } = useCollection<any>(productsQuery);

  const productsMap = useMemo(() => {
    if (!products) return new Map();
    return new Map(products.map((p) => [p.id, p.name]));
  }, [products]);

  const isLoadingData = isLoading || !products;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Production Batches" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Batches</CardTitle>
            <CardDescription>
              An overview of all production runs, scheduled and completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead className="text-right">Quantity Produced</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingData
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-48" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-24 mx-auto rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-16 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  : batches?.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-mono text-xs">
                          {batch.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="font-medium">
                          {productsMap.get(batch.productId) || 'Unknown Product'}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={`border-0 text-white ${getStatusVariant(
                              batch.status
                            )}`}
                          >
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {batch.startTime?.toDate
                            ? format(batch.startTime.toDate(), 'Pp')
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {batch.endTime?.toDate
                            ? format(batch.endTime.toDate(), 'Pp')
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          {batch.quantityProduced.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            {!isLoadingData && (!batches || batches.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                No production batches found. Try seeding the database in the
                Admin panel.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
