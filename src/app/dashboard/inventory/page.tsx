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
import { Progress } from '@/components/ui/progress';
import { type Inventory } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

function getStockStatus(quantity: number, reorderPoint: number) {
  if (quantity === 0) return 'Out of Stock';
  if (quantity < reorderPoint) return 'Low Stock';
  return 'In Stock';
}

function getStatusColor(status: string) {
  switch (status) {
    case 'In Stock':
      return 'bg-green-500';
    case 'Low Stock':
      return 'bg-yellow-500';
    case 'Out of Stock':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export default function InventoryPage() {
  const firestore = useFirestore();
  const inventoryQuery = useMemoFirebase(
    () => query(collection(firestore, 'inventory'), orderBy('materialId')),
    [firestore]
  );
  const { data: inventory, isLoading } = useCollection<Inventory>(inventoryQuery);
  
  const materialsQuery = useMemoFirebase(
    () => collection(firestore, 'materials'),
    [firestore]
  );
  const { data: materials } = useCollection<any>(materialsQuery);

  const materialsMap = useMemo(() => {
    if (!materials) return new Map();
    return new Map(materials.map(m => [m.id, m]));
  }, [materials]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Inventory Management" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Stock</CardTitle>
            <CardDescription>
              An overview of all materials in your inventory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Reorder Point</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[200px] text-center">Stock Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 mx-auto rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  inventory?.map((item) => {
                    const material = materialsMap.get(item.materialId);
                    if (!material) return null;

                    const status = getStockStatus(item.quantity, material.reorderPoint);
                    const stockPercentage = (item.quantity / (material.reorderPoint * 2)) * 100;
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>{material.sku}</TableCell>
                        <TableCell className="text-center">{item.quantity} {material.unit}</TableCell>
                        <TableCell className="text-center">{material.reorderPoint} {material.unit}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={`border-0 text-white ${getStatusColor(status)}`}>
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Progress value={stockPercentage} className="h-2" />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {!isLoading && inventory?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No inventory data found.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
