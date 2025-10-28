
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
import { type Inventory, type Material } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

function getStockStatus(quantity: number, reorderPoint: number | undefined) {
  if (quantity === 0) return 'Out of Stock';
  if (reorderPoint && quantity < reorderPoint) return 'Low Stock';
  return 'In Stock';
}

function getStatusColor(status: string) {
  switch (status) {
    case 'In Stock':
      return 'bg-green-500';
    case 'Low Stock':
      return 'bg-yellow-500 text-black';
    case 'Out of Stock':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export default function InventoryPage() {
  const firestore = useFirestore();
  const inventoryQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'inventory'), orderBy('itemId')) : null),
    [firestore]
  );
  const { data: inventory, isLoading } = useCollection<Inventory>(inventoryQuery);
  
  const materialsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'materials') : null),
    [firestore]
  );
  const { data: materials } = useCollection<Material>(materialsQuery);

  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products') : null),
    [firestore]
  );
  const { data: products } = useCollection<any>(productsQuery);

  const itemMap = useMemo(() => {
    const map = new Map();
    if (materials) {
      materials.forEach(m => map.set(m.id, m));
    }
    if (products) {
      products.forEach(p => map.set(p.id, p));
    }
    return map;
  }, [materials, products]);

  const isLoadingData = isLoading || !materials || !products;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Inventory Management" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Stock</CardTitle>
            <CardDescription>
              An overview of all materials and finished products in your inventory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Reorder Point</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[200px] text-center">Stock Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingData ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 mx-auto rounded-full" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  inventory?.map((item) => {
                    const stockItem = itemMap.get(item.itemId);
                    if (!stockItem) return null;

                    const reorderPoint = stockItem.reorderPoint || (item.itemType === 'product' ? 50 : undefined);
                    const status = getStockStatus(item.quantity, reorderPoint);
                    const maxStock = reorderPoint ? reorderPoint * 2 : item.quantity * 2 || 100;
                    const stockPercentage = (item.quantity / maxStock) * 100;
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{stockItem.name}</TableCell>
                        <TableCell className="capitalize">{item.itemType}</TableCell>
                        <TableCell>{stockItem.sku}</TableCell>
                        <TableCell className="text-center">{item.quantity} {stockItem.unit || ''}</TableCell>
                        <TableCell className="text-center">{reorderPoint || 'N/A'}</TableCell>
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
            {!isLoadingData && (!inventory || inventory.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                    No inventory data found. Try seeding the database in the Admin panel.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
