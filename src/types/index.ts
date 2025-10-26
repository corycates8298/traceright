
import type { LucideIcon } from 'lucide-react';

export type Layout = 'analyst' | 'executive' | 'warehouse' | 'custom';

// Widget Dashboard Builder Types
export type WidgetType =
  | 'kpi-card'
  | 'revenue-chart'
  | 'order-status-chart'
  | 'warehouse-utilization'
  | 'recent-activity';

export type WidgetConfig = {
  id: string;
  type: WidgetType;
  title: string;
  gridConfig: {
    w: number; // width in grid units
    h: number; // height in grid units
    x: number; // x position in grid units
    y: number; // y position in grid units
  };
};

export type CustomDashboard = {
  id: string;
  name: string;
  widgets: WidgetConfig[];
};


// Core Supply Chain & Flow
export type Supplier = {
  id: string;
  name: string;
  logoUrl?: string;
  status: 'Active' | 'Inactive' | 'On-hold';
  performance: {
    onTimeDelivery: number; // percentage
    qualityScore: number; // 0-100
    responseRate: number; // percentage
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  customFields: Record<string, any>;
  createdAt: any; // serverTimestamp
  updatedAt: any; // serverTimestamp
};

export type Material = {
  id: string;
  name: string;
  supplierId: string; // doc ref to suppliers
  sku: string;
  cost: number;
  unit: string;
  reorderPoint?: number;
  customFields: Record<string, any>;
  createdAt: any;
  updatedAt: any;
};

export type Recipe = {
  id: string;
  name: string;
  productId: string; // doc ref to products (for finished good)
  outputQuantity: number;
  ingredients: {
    materialId: string; // doc ref to materials
    quantity: number;
  }[];
  customFields: Record<string, any>;
  createdAt: any;
  updatedAt: any;
};

export type Product = {
    id: string;
    name: string;
    sku: string;
    description: string;
    pricing: number;
    currentStock: number;
    recipeId: string; // doc ref to recipes
    customFields: Record<string, any>;
    createdAt: any;
    updatedAt: any;
};

export type Order = {
  id: string;
  type: 'Purchase' | 'Transfer' | 'Sale';
  status:
    | 'Pending'
    | 'Processing'
    | 'In-Transit'
    | 'Delivered'
    | 'Cancelled'
    | 'Delayed';
  supplierId?: string; // doc ref for Purchase Orders
  customerId?: string; // doc ref for Sale Orders
  originWarehouseId?: string; // doc ref for Transfers/Sales
  destinationWarehouseId?: string; // doc ref for Transfers/Purchases
  items: {
    materialId: string; // doc ref
    quantity: number;
    priceAtTime: number;
  }[];
  totalValue: number;
  trackingId?: string;
  expectedDeliveryDate: any; // timestamp
  actualDeliveryDate?: any; // timestamp
  customFields: Record<string, any>;
  createdAt: any;
  updatedAt: any;
};

export type OrderEvent = {
  id: string;
  timestamp: any; // serverTimestamp
  type: 'StatusChange' | 'LocationUpdate' | 'NoteAdded';
  details: string;
  location?: {
    lat: number;
    lng: number;
  };
  userId?: string; // doc ref to users, for who made the change
};

// Inventory & Warehousing
export type Warehouse = {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  capacity: number; // e.g., in cubic meters or pallets
  customFields: Record<string, any>;
  createdAt: any;
  updatedAt: any;
};

export type Inventory = {
  id: string; // composite key: `${warehouseId}_${materialId}` or `${warehouseId}_${productId}`
  warehouseId: string; // doc ref
  itemId: string; // doc ref to either materials or products
  itemType: 'material' | 'product';
  quantity: number;
  lastRestocked: any; // timestamp
  customFields: Record<string, any>;
  updatedAt: any;
};

// Users, Access, and System
export type UserProfile = {
  id: string; // Corresponds to Firebase Auth UID
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'Reader' | 'Editor' | 'Supervisor' | 'Admin';
  supervisorId?: string; // doc ref to users
  teamId?: string; // doc ref to teams
  createdAt: any;
};

export type CustomerProfile = {
  id: string; // Corresponds to a customer account
  displayName: string;
  email: string;
  themeSettings: Record<string, any>; // For 'Equalizer' theme
  dashboardLayouts: Record<string, any>; // For user-built dashboards
  createdAt: any;
};

export type SystemConfig = {
  id: string; // e.g., 'ruleEngine', 'featureFlags'
  settings: Record<string, any>;
  updatedAt: any;
};

export type UiSchema = {
  id: string; // e.g., 'orders_detail_view'
  collectionName: string;
  schema: Record<string, any>; // JSON schema for the UI
  updatedAt: any;
};
