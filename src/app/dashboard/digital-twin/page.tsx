'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';

const warehouses = [
  { id: 'wh-1', name: 'Main Distribution Center', position: { lat: 34.0522, lng: -118.2437 } },
  { id: 'wh-2', name: 'West Coast Hub', position: { lat: 37.7749, lng: -122.4194 } },
  { id: 'wh-3', name: 'East Coast Hub', position: { lat: 40.7128, lng: -74.0060 } },
];

const ordersInTransit = [
    { id: 'order-1', position: { lat: 36.1699, lng: -115.1398 } },
    { id: 'order-2', position: { lat: 39.7392, lng: -104.9903 } },
    { id: 'order-3', position: { lat: 41.8781, lng: -87.6298 } },
];

export default function DigitalTwinPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title="Digital Twin" />
        <main className="flex-1 p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Configuration Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">
                        Google Maps API key is missing. Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
                    </p>
                </CardContent>
            </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Digital Twin" />
      <main className="flex-1 p-4 sm:p-6">
        <Card className="h-[80vh]">
          <CardContent className="p-0 h-full">
            <APIProvider apiKey={apiKey}>
              <Map
                defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
                defaultZoom={4}
                mapId="traceright-digital-twin"
                className="rounded-lg h-full"
              >
                {warehouses.map((warehouse) => (
                    <AdvancedMarker key={warehouse.id} position={warehouse.position} title={warehouse.name}>
                        <Pin backgroundColor={"#1E90FF"} glyphColor={"#FFF"} borderColor={"#1E90FF"} />
                    </AdvancedMarker>
                ))}
                {ordersInTransit.map((order) => (
                    <AdvancedMarker key={order.id} position={order.position} title={`Order ${order.id}`}>
                        <Pin backgroundColor={"#FFA500"} glyphColor={"#000"} borderColor={"#FFA500"} />
                    </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
