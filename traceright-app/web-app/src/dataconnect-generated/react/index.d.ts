import { AddNewLocationData, AddNewLocationVariables, ListAllProductsData, UpdateShipmentStatusData, UpdateShipmentStatusVariables, ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewLocation(options?: useDataConnectMutationOptions<AddNewLocationData, FirebaseError, AddNewLocationVariables>): UseDataConnectMutationResult<AddNewLocationData, AddNewLocationVariables>;
export function useAddNewLocation(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewLocationData, FirebaseError, AddNewLocationVariables>): UseDataConnectMutationResult<AddNewLocationData, AddNewLocationVariables>;

export function useListAllProducts(options?: useDataConnectQueryOptions<ListAllProductsData>): UseDataConnectQueryResult<ListAllProductsData, undefined>;
export function useListAllProducts(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllProductsData>): UseDataConnectQueryResult<ListAllProductsData, undefined>;

export function useUpdateShipmentStatus(options?: useDataConnectMutationOptions<UpdateShipmentStatusData, FirebaseError, UpdateShipmentStatusVariables>): UseDataConnectMutationResult<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
export function useUpdateShipmentStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateShipmentStatusData, FirebaseError, UpdateShipmentStatusVariables>): UseDataConnectMutationResult<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

export function useListTraceEventsForShipment(vars: ListTraceEventsForShipmentVariables, options?: useDataConnectQueryOptions<ListTraceEventsForShipmentData>): UseDataConnectQueryResult<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
export function useListTraceEventsForShipment(dc: DataConnect, vars: ListTraceEventsForShipmentVariables, options?: useDataConnectQueryOptions<ListTraceEventsForShipmentData>): UseDataConnectQueryResult<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
