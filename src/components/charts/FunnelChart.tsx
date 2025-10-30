
'use client';

import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { value: 100, name: 'Impressions', fill: '#8884d8' },
  { value: 80, name: 'Clicks', fill: '#83a6ed' },
  { value: 50, name: 'Add to Cart', fill: '#8dd1e1' },
  { value: 40, name: 'Checkout', fill: '#82ca9d' },
  { value: 26, name: 'Purchase', fill: '#a4de6c' },
];

export function FunnelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsFunnelChart>
            <Tooltip />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
          </RechartsFunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
