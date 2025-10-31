import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewLocationData {
  location_insert: Location_Key;
}

export interface AddNewLocationVariables {
  address: string;
  contactPerson?: string | null;
  contactPhone?: string | null;
  latitude?: number | null;
  locationName: string;
  locationType: string;
  longitude?: number | null;
}

export interface ListAllProductsData {
  products: ({
    id: UUIDString;
    productName: string;
    productID: string;
    productCategory: string;
    manufacturer?: string | null;
    description?: string | null;
    dimensions?: string | null;
    weight?: number | null;
    imageUrl?: string | null;
    createdAt: TimestampString;
  } & Product_Key)[];
}

export interface ListTraceEventsForShipmentData {
  traceEvents: ({
    id: UUIDString;
    eventTimestamp: TimestampString;
    eventType: string;
    description: string;
    location?: {
      locationName: string;
      address: string;
    };
      product?: {
        productName: string;
        productID: string;
      };
        quantityAffected?: number | null;
        qualityStatus?: string | null;
        responsibleParty?: string | null;
  } & TraceEvent_Key)[];
}

export interface ListTraceEventsForShipmentVariables {
  shipmentId: UUIDString;
}

export interface Location_Key {
  id: UUIDString;
  __typename?: 'Location_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface Shipment_Key {
  id: UUIDString;
  __typename?: 'Shipment_Key';
}

export interface Supplier_Key {
  id: UUIDString;
  __typename?: 'Supplier_Key';
}

export interface TraceEvent_Key {
  id: UUIDString;
  __typename?: 'TraceEvent_Key';
}

export interface UpdateShipmentStatusData {
  shipment_update?: Shipment_Key | null;
}

export interface UpdateShipmentStatusVariables {
  id: UUIDString;
  currentStatus: string;
}

interface AddNewLocationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewLocationVariables): MutationRef<AddNewLocationData, AddNewLocationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewLocationVariables): MutationRef<AddNewLocationData, AddNewLocationVariables>;
  operationName: string;
}
export const addNewLocationRef: AddNewLocationRef;

export function addNewLocation(vars: AddNewLocationVariables): MutationPromise<AddNewLocationData, AddNewLocationVariables>;
export function addNewLocation(dc: DataConnect, vars: AddNewLocationVariables): MutationPromise<AddNewLocationData, AddNewLocationVariables>;

interface ListAllProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllProductsData, undefined>;
  operationName: string;
}
export const listAllProductsRef: ListAllProductsRef;

export function listAllProducts(): QueryPromise<ListAllProductsData, undefined>;
export function listAllProducts(dc: DataConnect): QueryPromise<ListAllProductsData, undefined>;

interface UpdateShipmentStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
  operationName: string;
}
export const updateShipmentStatusRef: UpdateShipmentStatusRef;

export function updateShipmentStatus(vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
export function updateShipmentStatus(dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

interface ListTraceEventsForShipmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTraceEventsForShipmentVariables): QueryRef<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTraceEventsForShipmentVariables): QueryRef<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
  operationName: string;
}
export const listTraceEventsForShipmentRef: ListTraceEventsForShipmentRef;

export function listTraceEventsForShipment(vars: ListTraceEventsForShipmentVariables): QueryPromise<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
export function listTraceEventsForShipment(dc: DataConnect, vars: ListTraceEventsForShipmentVariables): QueryPromise<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;

