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
import { type Product, type Inventory } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const firestore = useFirestore();
  const productsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'products'), orderBy('name')) : null),
    [firestore]
  );
  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);

  const inventoryQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'inventory') : null),
    [firestore]
  );
  const { data: inventory, isLoading: isLoadingInventory } = useCollection<Inventory>(inventoryQuery);

  const productStockMap = useMemo(() => {
    if (!inventory) return new Map();
    return inventory.reduce((acc, item) => {
      if (item.itemType === 'product') {
        const currentStock = acc.get(item.itemId) || 0;
        acc.set(item.itemId, currentStock + item.quantity);
      }
      return acc;
    }, new Map<string, number>());
  }, [inventory]);

  const isLoading = isLoadingProducts || isLoadingInventory;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Finished Products" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>
              A list of all finished goods produced.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Current Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-64" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  products?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell className="text-muted-foreground max-w-sm truncate">{product.description}</TableCell>
                      <TableCell className="text-right">${product.pricing.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {productStockMap.get(product.id) || 0}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {!isLoading && (!products || products.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                    No products found. Try seeding the database in the Admin panel.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
