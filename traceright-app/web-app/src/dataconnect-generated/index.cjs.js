const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'traceright-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewLocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewLocation', inputVars);
}
addNewLocationRef.operationName = 'AddNewLocation';
exports.addNewLocationRef = addNewLocationRef;

exports.addNewLocation = function addNewLocation(dcOrVars, vars) {
  return executeMutation(addNewLocationRef(dcOrVars, vars));
};

const listAllProductsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllProducts');
}
listAllProductsRef.operationName = 'ListAllProducts';
exports.listAllProductsRef = listAllProductsRef;

exports.listAllProducts = function listAllProducts(dc) {
  return executeQuery(listAllProductsRef(dc));
};

const updateShipmentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateShipmentStatus', inputVars);
}
updateShipmentStatusRef.operationName = 'UpdateShipmentStatus';
exports.updateShipmentStatusRef = updateShipmentStatusRef;

exports.updateShipmentStatus = function updateShipmentStatus(dcOrVars, vars) {
  return executeMutation(updateShipmentStatusRef(dcOrVars, vars));
};

const listTraceEventsForShipmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTraceEventsForShipment', inputVars);
}
listTraceEventsForShipmentRef.operationName = 'ListTraceEventsForShipment';
exports.listTraceEventsForShipmentRef = listTraceEventsForShipmentRef;

exports.listTraceEventsForShipment = function listTraceEventsForShipment(dcOrVars, vars) {
  return executeQuery(listTraceEventsForShipmentRef(dcOrVars, vars));
};
