
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ThemePreview() {
  return (
    <div className="space-y-4">
        <h3 className="font-semibold">Sample Card</h3>
        <p className="text-sm text-muted-foreground">This shows how your theme will look.</p>
        <Card>
            <CardHeader>
                <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="text-3xl font-bold">$2.4M</div>
                <Button>View Report</Button>
            </CardContent>
        </Card>
    </div>
  );
}
