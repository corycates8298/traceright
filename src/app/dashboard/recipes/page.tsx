'use client';

import { useMemo } from 'react';
import { useCollection, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Header } from '@/components/layout/header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Recipe } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Factory, Package } from 'lucide-react';

export default function RecipesPage() {
  const firestore = useFirestore();
  const recipesQuery = useMemoFirebase(
    () => query(collection(firestore, 'recipes'), orderBy('name')),
    [firestore]
  );
  const { data: recipes, isLoading } = useCollection<Recipe>(recipesQuery);

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
      <Header title="Recipes & Formulations" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Production Recipes</CardTitle>
            <CardDescription>
              Bill of Materials for all finished products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {recipes?.map((recipe) => (
                  <AccordionItem value={recipe.id} key={recipe.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <Factory className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{recipe.name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-8 pr-4">
                        <div className="mb-4">
                            <p className="font-semibold text-sm flex items-center gap-2">
                                <Package className="h-4 w-4 text-muted-foreground"/>
                                Output: {recipe.outputQuantity} x {materialsMap.get(recipe.outputMaterialId)?.name || 'Unknown Product'}
                            </p>
                        </div>
                        <h4 className="font-semibold mb-2">Ingredients:</h4>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ing, index) => {
                            const material = materialsMap.get(ing.materialId);
                            return (
                              <li key={index} className="flex justify-between items-center text-sm">
                                <span>{material?.name || 'Unknown Material'}</span>
                                <span className="text-muted-foreground">{ing.quantity} {material?.unit || ''}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
             {!isLoading && recipes?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No recipes found.
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
