'use client';

import { useMemo } from 'react';
import Image from 'next/image';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { type Supplier } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

function getStatusColor(status: 'Active' | 'Inactive' | 'On-hold') {
  switch (status) {
    case 'Active':
      return 'bg-green-500';
    case 'Inactive':
      return 'bg-gray-500';
    case 'On-hold':
      return 'bg-yellow-500';
  }
}

export default function SuppliersPage() {
  const firestore = useFirestore();
  const suppliersQuery = useMemoFirebase(
    () => query(collection(firestore, 'suppliers'), orderBy('name')),
    [firestore]
  );
  const { data: suppliers, isLoading } = useCollection<Supplier>(suppliersQuery);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Suppliers" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Directory</CardTitle>
            <CardDescription>
              A list of all your suppliers and their performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">On-Time Delivery</TableHead>
                  <TableHead className="text-center">Quality Score</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                      </TableCell>
                      <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24 mx-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  suppliers?.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {supplier.logoUrl && <AvatarImage src={supplier.logoUrl} alt={supplier.name} />}
                            <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{supplier.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-0 text-white ${getStatusColor(supplier.status)}`}>
                          {supplier.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{supplier.performance.onTimeDelivery}%</TableCell>
                      <TableCell className="text-center">{supplier.performance.qualityScore}/100</TableCell>
                      <TableCell>
                        <div>
                            <div>{supplier.contact.name}</div>
                            <div className="text-xs text-muted-foreground">{supplier.contact.email}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
             {!isLoading && suppliers?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No suppliers found.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
