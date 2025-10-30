
'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  {
    name: 'Electronics',
    size: 2000,
    children: [
      { name: 'Phones', size: 1200 },
      { name: 'Laptops', size: 800 },
    ],
  },
  {
    name: 'Apparel',
    size: 1500,
    children: [
      { name: 'Shirts', size: 900 },
      { name: 'Pants', size: 600 },
    ],
  },
  {
    name: 'Groceries',
    size: 1000,
    children: [
        { name: 'Fruits', size: 400 },
        { name: 'Vegetables', size: 600 },
    ],
  },
];

export function TreemapVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory by Category (Treemap)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
