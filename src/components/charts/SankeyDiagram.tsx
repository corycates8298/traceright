
'use client';

import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = {
  nodes: [
    { name: 'Source A' },
    { name: 'Source B' },
    { name: 'Stage 1' },
    { name: 'Stage 2' },
    { name: 'End X' },
    { name: 'End Y' },
  ],
  links: [
    { source: 0, target: 2, value: 50 },
    { source: 1, target: 2, value: 50 },
    { source: 2, target: 3, value: 100 },
    { source: 3, target: 4, value: 60 },
    { source: 3, target: 5, value: 40 },
  ],
};

export function SankeyDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supply Chain Flow (Sankey)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <Sankey
            width={960}
            height={500}
            data={data}
            nodePadding={50}
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            }}
            link={{ stroke: '#777' }}
          >
            <Tooltip />
          </Sankey>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
