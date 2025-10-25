import type { LucideIcon } from 'lucide-react';

export type Supplier = {
  id: string;
  name: string;
  logo: string;
  status: 'Active' | 'Inactive' | 'On-hold';
  performance: {
    onTimeDelivery: number;
    qualityScore: number;
    responseRate: number;
  };
  history: { month: string; onTime: number; quality: number }[];
  documents: { name: string; url: string }[];
};

export type Order = {
  id: string;
  status: 'In-Transit' | 'Delivered' | 'Delayed';
  location: {
    lat: number;
    lng: number;
  };
  origin: string;
  destination: string;
};

export type DashboardWidgetItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};
