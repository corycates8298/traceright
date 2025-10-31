import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'traceright-app',
  location: 'us-east4'
};

export const addNewLocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewLocation', inputVars);
}
addNewLocationRef.operationName = 'AddNewLocation';

export function addNewLocation(dcOrVars, vars) {
  return executeMutation(addNewLocationRef(dcOrVars, vars));
}

export const listAllProductsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllProducts');
}
listAllProductsRef.operationName = 'ListAllProducts';

export function listAllProducts(dc) {
  return executeQuery(listAllProductsRef(dc));
}

export const updateShipmentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateShipmentStatus', inputVars);
}
updateShipmentStatusRef.operationName = 'UpdateShipmentStatus';

export function updateShipmentStatus(dcOrVars, vars) {
  return executeMutation(updateShipmentStatusRef(dcOrVars, vars));
}

export const listTraceEventsForShipmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTraceEventsForShipment', inputVars);
}
listTraceEventsForShipmentRef.operationName = 'ListTraceEventsForShipment';

export function listTraceEventsForShipment(dcOrVars, vars) {
  return executeQuery(listTraceEventsForShipmentRef(dcOrVars, vars));
}

