'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FeatureKey =
  // Core Logistics
  | 'logistics' | 'suppliers' | 'purchaseOrders' | 'inboundReceipts' | 'warehouseOps' | 'outboundShipments'
  // Production
  | 'rawMaterials' | 'recipes' | 'batches'
  // Intelligence
  | 'traceability' | 'aiReporting' | 'aiForecast' | 'materialsIntel' | 'mlIntelligence'
  // System
  | 'administration' | 'governance' | 'about'
  // Showcases
  | 'showcaseVisualization' | 'showcaseSheets'
  // Dashboard
  | 'dashboard3D' | 'dashboardCyberpunk' | 'dashboardBuilder' | 'aiVision'
  // Panels
  | 'aiAnalysis' | 'collaboration' | 'dataCleaningTools' | 'pivotTables' | 'templateLibrary' | 'themeCustomizer'
  // Widgets
  | 'widgetKPI' | 'widgetSalesChart' | 'widgetRevenueChart' | 'widgetInventory' | 'widgetOrders'
  | 'widgetProducts' | 'widgetPerformance' | 'widgetCustomChart'
  // Charts
  | 'chartBar' | 'chartLine' | 'chartPie' | 'chartArea' | 'chartRadar' | 'chartScatter'
  | 'chartTreemap' | 'chartSankey' | 'chartFunnel' | 'chartGauge' | 'chartWaterfall'
  | 'chartBullet' | 'chartHeatmap'
  // Advanced
  | 'advancedCharts' | 'realTimeUpdates' | 'exportData' | 'notifications';

type FeatureFlags = Record<FeatureKey, boolean>;

interface FeatureFlagsContextType {
  flags: FeatureFlags;
  isEnabled: (key: FeatureKey) => boolean;
  toggleFeature: (key: FeatureKey) => void;
  enableFeature: (key: FeatureKey) => void;
  disableFeature: (key: FeatureKey) => void;
  resetFlags: () => void;
  enableAll: () => void;
  disableAll: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => void;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

const STORAGE_KEY = 'traceright_feature_flags';

// Default: all features enabled
const defaultFlags: FeatureFlags = {
  // Core Logistics
  logistics: true, suppliers: true, purchaseOrders: true, inboundReceipts: true,
  warehouseOps: true, outboundShipments: true,
  // Production
  rawMaterials: true, recipes: true, batches: true,
  // Intelligence
  traceability: true, aiReporting: true, aiForecast: true, materialsIntel: true, mlIntelligence: true,
  // System
  administration: true, governance: true, about: true,
  // Showcases - DEFAULT FALSE for demo control
  showcaseVisualization: false, showcaseSheets: false,
  // Dashboard
  dashboard3D: true, dashboardCyberpunk: true, dashboardBuilder: true, aiVision: true,
  // Panels
  aiAnalysis: true, collaboration: true, dataCleaningTools: true, pivotTables: true,
  templateLibrary: true, themeCustomizer: true,
  // Widgets
  widgetKPI: true, widgetSalesChart: true, widgetRevenueChart: true, widgetInventory: true,
  widgetOrders: true, widgetProducts: true, widgetPerformance: true, widgetCustomChart: true,
  // Charts
  chartBar: true, chartLine: true, chartPie: true, chartArea: true, chartRadar: true,
  chartScatter: true, chartTreemap: true, chartSankey: true, chartFunnel: true,
  chartGauge: true, chartWaterfall: true, chartBullet: true, chartHeatmap: true,
  // Advanced
  advancedCharts: true, realTimeUpdates: true, exportData: true, notifications: true,
};

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFlags({ ...defaultFlags, ...parsed });
      } catch (e) {
        console.error('Failed to parse feature flags:', e);
      }
    }
  }, []);

  // Save to localStorage whenever flags change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
    }
  }, [flags, mounted]);

  const isEnabled = (key: FeatureKey) => flags[key] ?? false;

  const toggleFeature = (key: FeatureKey) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const enableFeature = (key: FeatureKey) => {
    setFlags(prev => ({ ...prev, [key]: true }));
  };

  const disableFeature = (key: FeatureKey) => {
    setFlags(prev => ({ ...prev, [key]: false }));
  };

  const resetFlags = () => {
    setFlags(defaultFlags);
  };

  const enableAll = () => {
    const allEnabled = Object.keys(flags).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as FeatureFlags
    );
    setFlags(allEnabled);
  };

  const disableAll = () => {
    const allDisabled = Object.keys(flags).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as FeatureFlags
    );
    setFlags(allDisabled);
  };

  const exportConfig = () => {
    return JSON.stringify(flags, null, 2);
  };

  const importConfig = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      setFlags({ ...defaultFlags, ...parsed });
    } catch (e) {
      console.error('Failed to import config:', e);
      throw new Error('Invalid JSON configuration');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <FeatureFlagsContext.Provider
      value={{
        flags,
        isEnabled,
        toggleFeature,
        enableFeature,
        disableFeature,
        resetFlags,
        enableAll,
        disableAll,
        exportConfig,
        importConfig,
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
}

// Convenience hook for checking single feature
export function useFeature(key: FeatureKey) {
  const { isEnabled } = useFeatureFlags();
  return isEnabled(key);
}
