# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAddNewLocation, useListAllProducts, useUpdateShipmentStatus, useListTraceEventsForShipment } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAddNewLocation(addNewLocationVars);

const { data, isPending, isSuccess, isError, error } = useListAllProducts();

const { data, isPending, isSuccess, isError, error } = useUpdateShipmentStatus(updateShipmentStatusVars);

const { data, isPending, isSuccess, isError, error } = useListTraceEventsForShipment(listTraceEventsForShipmentVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewLocation, listAllProducts, updateShipmentStatus, listTraceEventsForShipment } from '@dataconnect/generated';


// Operation AddNewLocation:  For variables, look at type AddNewLocationVars in ../index.d.ts
const { data } = await AddNewLocation(dataConnect, addNewLocationVars);

// Operation ListAllProducts: 
const { data } = await ListAllProducts(dataConnect);

// Operation UpdateShipmentStatus:  For variables, look at type UpdateShipmentStatusVars in ../index.d.ts
const { data } = await UpdateShipmentStatus(dataConnect, updateShipmentStatusVars);

// Operation ListTraceEventsForShipment:  For variables, look at type ListTraceEventsForShipmentVars in ../index.d.ts
const { data } = await ListTraceEventsForShipment(dataConnect, listTraceEventsForShipmentVars);


```