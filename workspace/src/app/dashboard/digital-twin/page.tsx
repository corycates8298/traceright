
'use client';

import { useMemo } from 'react';
import { useCollection, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import { type Warehouse, type Order } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DigitalTwinPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const firestore = useFirestore();

  const warehousesQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'warehouses') : null),
    [firestore]
  );
  const { data: warehouses, isLoading: isLoadingWarehouses } =
    useCollection<Warehouse>(warehousesQuery);

  const shipmentsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(
            collection(firestore, 'shipments'),
            where('status', '==', 'In-Transit')
          )
        : null,
    [firestore]
  );
  const { data: shipments, isLoading: isLoadingShipments } =
    useCollection<any>(shipmentsQuery);

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
                Google Maps API key is missing. Please set the
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const isLoading = isLoadingWarehouses || isLoadingShipments;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Digital Twin" />
      <main className="flex-1 p-4 sm:p-6">
        <Card className="h-[80vh]">
          <CardContent className="p-0 h-full">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
                  defaultZoom={4}
                  mapId="traceright-digital-twin"
                  className="rounded-lg h-full"
                >
                  {warehouses?.map((warehouse) => (
                    <AdvancedMarker
                      key={warehouse.id}
                      position={{
                        lat: warehouse.location.latitude,
                        lng: warehouse.location.longitude,
                      }}
                      title={warehouse.name}
                    >
                      <Pin
                        backgroundColor={'#1E90FF'}
                        glyphColor={'#FFF'}
                        borderColor={'#1E90FF'}
                      />
                    </AdvancedMarker>
                  ))}
                  {shipments?.map((shipment) => (
                    <AdvancedMarker
                      key={shipment.id}
                      position={{
                        lat: shipment.currentLocation.latitude,
                        lng: shipment.currentLocation.longitude,
                      }}
                      title={`Order ${shipment.orderId}`}
                    >
                      <Pin
                        backgroundColor={'#FFA500'}
                        glyphColor={'#000'}
                        borderColor={'#FFA500'}
                      />
                    </AdvancedMarker>
                  ))}
                </Map>
              </APIProvider>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
