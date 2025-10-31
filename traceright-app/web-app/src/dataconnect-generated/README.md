# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllProducts*](#listallproducts)
  - [*ListTraceEventsForShipment*](#listtraceeventsforshipment)
- [**Mutations**](#mutations)
  - [*AddNewLocation*](#addnewlocation)
  - [*UpdateShipmentStatus*](#updateshipmentstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllProducts
You can execute the `ListAllProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllProducts(): QueryPromise<ListAllProductsData, undefined>;

interface ListAllProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllProductsData, undefined>;
}
export const listAllProductsRef: ListAllProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllProducts(dc: DataConnect): QueryPromise<ListAllProductsData, undefined>;

interface ListAllProductsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllProductsData, undefined>;
}
export const listAllProductsRef: ListAllProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllProductsRef:
```typescript
const name = listAllProductsRef.operationName;
console.log(name);
```

### Variables
The `ListAllProducts` query has no variables.
### Return Type
Recall that executing the `ListAllProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllProductsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllProducts } from '@dataconnect/generated';


// Call the `listAllProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllProducts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllProducts(dataConnect);

console.log(data.products);

// Or, you can use the `Promise` API.
listAllProducts().then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `ListAllProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllProductsRef } from '@dataconnect/generated';


// Call the `listAllProductsRef()` function to get a reference to the query.
const ref = listAllProductsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllProductsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## ListTraceEventsForShipment
You can execute the `ListTraceEventsForShipment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTraceEventsForShipment(vars: ListTraceEventsForShipmentVariables): QueryPromise<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;

interface ListTraceEventsForShipmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTraceEventsForShipmentVariables): QueryRef<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
}
export const listTraceEventsForShipmentRef: ListTraceEventsForShipmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTraceEventsForShipment(dc: DataConnect, vars: ListTraceEventsForShipmentVariables): QueryPromise<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;

interface ListTraceEventsForShipmentRef {
  ...
  (dc: DataConnect, vars: ListTraceEventsForShipmentVariables): QueryRef<ListTraceEventsForShipmentData, ListTraceEventsForShipmentVariables>;
}
export const listTraceEventsForShipmentRef: ListTraceEventsForShipmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTraceEventsForShipmentRef:
```typescript
const name = listTraceEventsForShipmentRef.operationName;
console.log(name);
```

### Variables
The `ListTraceEventsForShipment` query requires an argument of type `ListTraceEventsForShipmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTraceEventsForShipmentVariables {
  shipmentId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTraceEventsForShipment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTraceEventsForShipmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTraceEventsForShipment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTraceEventsForShipment, ListTraceEventsForShipmentVariables } from '@dataconnect/generated';

// The `ListTraceEventsForShipment` query requires an argument of type `ListTraceEventsForShipmentVariables`:
const listTraceEventsForShipmentVars: ListTraceEventsForShipmentVariables = {
  shipmentId: ..., 
};

// Call the `listTraceEventsForShipment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTraceEventsForShipment(listTraceEventsForShipmentVars);
// Variables can be defined inline as well.
const { data } = await listTraceEventsForShipment({ shipmentId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTraceEventsForShipment(dataConnect, listTraceEventsForShipmentVars);

console.log(data.traceEvents);

// Or, you can use the `Promise` API.
listTraceEventsForShipment(listTraceEventsForShipmentVars).then((response) => {
  const data = response.data;
  console.log(data.traceEvents);
});
```

### Using `ListTraceEventsForShipment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTraceEventsForShipmentRef, ListTraceEventsForShipmentVariables } from '@dataconnect/generated';

// The `ListTraceEventsForShipment` query requires an argument of type `ListTraceEventsForShipmentVariables`:
const listTraceEventsForShipmentVars: ListTraceEventsForShipmentVariables = {
  shipmentId: ..., 
};

// Call the `listTraceEventsForShipmentRef()` function to get a reference to the query.
const ref = listTraceEventsForShipmentRef(listTraceEventsForShipmentVars);
// Variables can be defined inline as well.
const ref = listTraceEventsForShipmentRef({ shipmentId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTraceEventsForShipmentRef(dataConnect, listTraceEventsForShipmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.traceEvents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.traceEvents);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewLocation
You can execute the `AddNewLocation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewLocation(vars: AddNewLocationVariables): MutationPromise<AddNewLocationData, AddNewLocationVariables>;

interface AddNewLocationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewLocationVariables): MutationRef<AddNewLocationData, AddNewLocationVariables>;
}
export const addNewLocationRef: AddNewLocationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewLocation(dc: DataConnect, vars: AddNewLocationVariables): MutationPromise<AddNewLocationData, AddNewLocationVariables>;

interface AddNewLocationRef {
  ...
  (dc: DataConnect, vars: AddNewLocationVariables): MutationRef<AddNewLocationData, AddNewLocationVariables>;
}
export const addNewLocationRef: AddNewLocationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewLocationRef:
```typescript
const name = addNewLocationRef.operationName;
console.log(name);
```

### Variables
The `AddNewLocation` mutation requires an argument of type `AddNewLocationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewLocationVariables {
  address: string;
  contactPerson?: string | null;
  contactPhone?: string | null;
  latitude?: number | null;
  locationName: string;
  locationType: string;
  longitude?: number | null;
}
```
### Return Type
Recall that executing the `AddNewLocation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewLocationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewLocationData {
  location_insert: Location_Key;
}
```
### Using `AddNewLocation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewLocation, AddNewLocationVariables } from '@dataconnect/generated';

// The `AddNewLocation` mutation requires an argument of type `AddNewLocationVariables`:
const addNewLocationVars: AddNewLocationVariables = {
  address: ..., 
  contactPerson: ..., // optional
  contactPhone: ..., // optional
  latitude: ..., // optional
  locationName: ..., 
  locationType: ..., 
  longitude: ..., // optional
};

// Call the `addNewLocation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewLocation(addNewLocationVars);
// Variables can be defined inline as well.
const { data } = await addNewLocation({ address: ..., contactPerson: ..., contactPhone: ..., latitude: ..., locationName: ..., locationType: ..., longitude: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewLocation(dataConnect, addNewLocationVars);

console.log(data.location_insert);

// Or, you can use the `Promise` API.
addNewLocation(addNewLocationVars).then((response) => {
  const data = response.data;
  console.log(data.location_insert);
});
```

### Using `AddNewLocation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewLocationRef, AddNewLocationVariables } from '@dataconnect/generated';

// The `AddNewLocation` mutation requires an argument of type `AddNewLocationVariables`:
const addNewLocationVars: AddNewLocationVariables = {
  address: ..., 
  contactPerson: ..., // optional
  contactPhone: ..., // optional
  latitude: ..., // optional
  locationName: ..., 
  locationType: ..., 
  longitude: ..., // optional
};

// Call the `addNewLocationRef()` function to get a reference to the mutation.
const ref = addNewLocationRef(addNewLocationVars);
// Variables can be defined inline as well.
const ref = addNewLocationRef({ address: ..., contactPerson: ..., contactPhone: ..., latitude: ..., locationName: ..., locationType: ..., longitude: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewLocationRef(dataConnect, addNewLocationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.location_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.location_insert);
});
```

## UpdateShipmentStatus
You can execute the `UpdateShipmentStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateShipmentStatus(vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

interface UpdateShipmentStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
}
export const updateShipmentStatusRef: UpdateShipmentStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateShipmentStatus(dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationPromise<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;

interface UpdateShipmentStatusRef {
  ...
  (dc: DataConnect, vars: UpdateShipmentStatusVariables): MutationRef<UpdateShipmentStatusData, UpdateShipmentStatusVariables>;
}
export const updateShipmentStatusRef: UpdateShipmentStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateShipmentStatusRef:
```typescript
const name = updateShipmentStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateShipmentStatus` mutation requires an argument of type `UpdateShipmentStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateShipmentStatusVariables {
  id: UUIDString;
  currentStatus: string;
}
```
### Return Type
Recall that executing the `UpdateShipmentStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateShipmentStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateShipmentStatusData {
  shipment_update?: Shipment_Key | null;
}
```
### Using `UpdateShipmentStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateShipmentStatus, UpdateShipmentStatusVariables } from '@dataconnect/generated';

// The `UpdateShipmentStatus` mutation requires an argument of type `UpdateShipmentStatusVariables`:
const updateShipmentStatusVars: UpdateShipmentStatusVariables = {
  id: ..., 
  currentStatus: ..., 
};

// Call the `updateShipmentStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateShipmentStatus(updateShipmentStatusVars);
// Variables can be defined inline as well.
const { data } = await updateShipmentStatus({ id: ..., currentStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateShipmentStatus(dataConnect, updateShipmentStatusVars);

console.log(data.shipment_update);

// Or, you can use the `Promise` API.
updateShipmentStatus(updateShipmentStatusVars).then((response) => {
  const data = response.data;
  console.log(data.shipment_update);
});
```

### Using `UpdateShipmentStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateShipmentStatusRef, UpdateShipmentStatusVariables } from '@dataconnect/generated';

// The `UpdateShipmentStatus` mutation requires an argument of type `UpdateShipmentStatusVariables`:
const updateShipmentStatusVars: UpdateShipmentStatusVariables = {
  id: ..., 
  currentStatus: ..., 
};

// Call the `updateShipmentStatusRef()` function to get a reference to the mutation.
const ref = updateShipmentStatusRef(updateShipmentStatusVars);
// Variables can be defined inline as well.
const ref = updateShipmentStatusRef({ id: ..., currentStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateShipmentStatusRef(dataConnect, updateShipmentStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shipment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shipment_update);
});
```

