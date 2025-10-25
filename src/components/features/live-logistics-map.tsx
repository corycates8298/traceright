'use client';

import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import { AlertCircle, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Order } from '@/types';
import { Button } from '../ui/button';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    status: 'In-Transit',
    location: { lat: 34.0522, lng: -118.2437 },
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
  },
  {
    id: 'ORD-002',
    status: 'In-Transit',
    location: { lat: 41.8781, lng: -87.6298 },
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
  },
  {
    id: 'ORD-003',
    status: 'Delayed',
    location: { lat: 39.9526, lng: -75.1652 },
    origin: 'Philadelphia, PA',
    destination: 'Boston, MA',
  },
  {
    id: 'ORD-004',
    status: 'In-Transit',
    location: { lat: 29.7604, lng: -95.3698 },
    origin: 'Houston, TX',
    destination: 'Seattle, WA',
  },
];

export function LiveLogisticsMap() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Google Maps API Key Missing</AlertTitle>
        <AlertDescription>
          Please provide a Google Maps API key in your environment variables as
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to display the map.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
          defaultZoom={4}
          mapId="supply_chain_map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {MOCK_ORDERS.map((order) => (
            <AdvancedMarker
              key={order.id}
              position={order.location}
              onClick={() => setSelectedOrder(order)}
            >
              <Pin
                background={order.status === 'Delayed' ? '#ef4444' : '#73A89A'}
                borderColor={order.status === 'Delayed' ? '#dc2626' : '#5f8b80'}
                glyphColor="#fff"
              >
                <Truck className="h-6 w-6" />
              </Pin>
            </AdvancedMarker>
          ))}

          {selectedOrder && (
            <InfoWindow
              position={selectedOrder.location}
              onCloseClick={() => setSelectedOrder(null)}
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="p-2">
                  <CardTitle className="text-base">{selectedOrder.id}</CardTitle>
                </CardHeader>
                <CardContent className="p-2 text-sm">
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={
                        selectedOrder.status === 'Delayed'
                          ? 'text-destructive'
                          : 'text-primary'
                      }
                    >
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p>
                    <strong>Origin:</strong> {selectedOrder.origin}
                  </p>
                  <p>
                    <strong>Destination:</strong> {selectedOrder.destination}
                  </p>
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
