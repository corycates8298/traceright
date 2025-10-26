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
import { type Material } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function MaterialsPage() {
  const firestore = useFirestore();
  const materialsQuery = useMemoFirebase(
    () => query(collection(firestore, 'materials'), orderBy('name')),
    [firestore]
  );
  const { data: materials, isLoading } = useCollection<Material>(materialsQuery);

  const suppliersQuery = useMemoFirebase(() => collection(firestore, 'suppliers'), [firestore]);
  const { data: suppliers } = useCollection<any>(suppliersQuery);

  const suppliersMap = useMemo(() => {
    if (!suppliers) return new Map();
    return new Map(suppliers.map(s => [s.id, s.name]));
  }, [suppliers]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Materials" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Raw Materials & Components</CardTitle>
            <CardDescription>
              A catalog of all materials used in production.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-center">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-12 mx-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  materials?.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.name}</TableCell>
                      <TableCell>{material.sku}</TableCell>
                      <TableCell>{suppliersMap.get(material.supplierId) || 'Unknown'}</TableCell>
                      <TableCell className="text-right">${material.cost.toFixed(2)}</TableCell>
                      <TableCell className="text-center">{material.unit}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {!isLoading && materials?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No materials found.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
