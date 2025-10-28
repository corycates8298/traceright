// src/components/admin/AdminPanel.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Database, Trash2, Shield, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SeedResult {
  success: boolean;
  message: string;
  results?: {
    suppliers: number;
    materials: number;
    recipes: number;
    orders: number;
    events: number;
  };
}

interface ClearResult {
  success: boolean;
  message: string;
  results?: Record<string, number>;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { gradientStyle } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [seedResult, setSeedResult] = useState<SeedResult | null>(null);
  const [clearResult, setClearResult] = useState<ClearResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const functions = getFunctions();
  const auth = getAuth();

  // Check admin status on mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Check Firestore for admin status
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === 'admin' || userData.isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError('Failed to verify admin status');
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      checkAdminStatus();
    }
  }, [isOpen, auth]);

  if (!isOpen) return null;

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setError(null);
    setSeedResult(null);

    try {
      const seedDB = httpsCallable<{}, SeedResult>(functions, 'seedDatabase');
      const result = await seedDB();
      setSeedResult(result.data);
    } catch (err: any) {
      console.error('Error seeding database:', err);
      setError(err.message || 'Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  const handleClearDatabase = async () => {
    if (confirmationCode !== 'DELETE_ALL_DATA') {
      setError('Invalid confirmation code. Type exactly: DELETE_ALL_DATA');
      return;
    }

    setClearing(true);
    setError(null);
    setClearResult(null);

    try {
      const clearDB = httpsCallable<{ confirmationCode: string }, ClearResult>(
        functions,
        'clearDatabase'
      );
      const result = await clearDB({ confirmationCode });
      setClearResult(result.data);
      setShowClearConfirm(false);
      setConfirmationCode('');
    } catch (err: any) {
      console.error('Error clearing database:', err);
      setError(err.message || 'Failed to clear database');
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 pointer-events-auto"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-[700px] h-full bg-white shadow-2xl pointer-events-auto overflow-y-auto">
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-6 text-white"
          style={{ background: gradientStyle }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Admin Control Panel</h2>
                <p className="text-sm text-white/90">Database management & system controls</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Loading State */}
          {loading && (
            <Card className="p-6 border-slate-200">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-violet-600" />
                <span className="text-slate-700">Verifying admin access...</span>
              </div>
            </Card>
          )}

          {/* Access Denied */}
          {!loading && !isAdmin && (
            <Card className="p-6 border-red-200 bg-red-50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-red-900 font-semibold mb-2">Access Denied</h3>
                  <p className="text-sm text-red-700 mb-3">
                    You do not have administrator privileges. Only admins can access this panel.
                  </p>
                  <p className="text-xs text-red-600">
                    To bootstrap the first admin, manually add a document to the <code className="bg-red-100 px-1 rounded">users</code> collection
                    in Firestore with your UID and set <code className="bg-red-100 px-1 rounded">role: "admin"</code>
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Admin Controls */}
          {!loading && isAdmin && (
            <>
              {/* Status Badge */}
              <Card className="p-4 border-green-200 bg-green-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    Administrator Access Verified
                  </span>
                  <Badge variant="outline" className="ml-auto bg-green-100 text-green-700 border-green-300">
                    ADMIN
                  </Badge>
                </div>
              </Card>

              {/* Error Display */}
              {error && (
                <Card className="p-4 border-red-200 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-900 mb-1">Error</h4>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setError(null)}
                      className="text-red-600 hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              )}

              {/* Seed Database Section */}
              <Card className="p-6 border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Seed Database with Demo Data
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Generate realistic supply chain data using Faker.js:
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1 mb-4">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        10 Suppliers with contact info & certifications
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        50 Raw Materials across 5 categories
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        5 Production Recipes with multi-step instructions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        100 Orders with line items & shipping details
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        200+ Traceability Events with timestamps & metadata
                      </li>
                    </ul>

                    {seedResult && seedResult.success && (
                      <Card className="p-4 border-green-200 bg-green-50 mb-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-green-900 mb-2">
                              {seedResult.message}
                            </h4>
                            {seedResult.results && (
                              <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                                <div>✓ Suppliers: {seedResult.results.suppliers}</div>
                                <div>✓ Materials: {seedResult.results.materials}</div>
                                <div>✓ Recipes: {seedResult.results.recipes}</div>
                                <div>✓ Orders: {seedResult.results.orders}</div>
                                <div>✓ Events: {seedResult.results.events}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    )}

                    <Button
                      onClick={handleSeedDatabase}
                      disabled={seeding}
                      style={{ background: gradientStyle }}
                      className="text-white"
                    >
                      {seeding ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Seeding Database...
                        </>
                      ) : (
                        <>
                          <Database className="w-4 h-4 mr-2" />
                          Seed Database
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Clear Database Section */}
              <Card className="p-6 border-red-200 bg-red-50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-200 rounded-lg">
                    <Trash2 className="w-6 h-6 text-red-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      Clear All Database Collections
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                      ⚠️ <strong>DANGER ZONE:</strong> This will permanently delete all data from:
                      suppliers, rawMaterials, recipes, orders, and traceabilityEvents collections.
                      This action cannot be undone.
                    </p>

                    {!showClearConfirm ? (
                      <Button
                        onClick={() => setShowClearConfirm(true)}
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Database
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-red-900 mb-2 block">
                            Type <code className="bg-red-200 px-2 py-1 rounded text-xs">DELETE_ALL_DATA</code> to confirm:
                          </label>
                          <Input
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            placeholder="DELETE_ALL_DATA"
                            className="border-red-300 focus:border-red-500"
                          />
                        </div>

                        {clearResult && clearResult.success && (
                          <Card className="p-4 border-red-300 bg-red-100">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium text-red-900 mb-2">
                                  {clearResult.message}
                                </h4>
                                {clearResult.results && (
                                  <div className="text-xs text-red-800 space-y-1">
                                    {Object.entries(clearResult.results).map(([collection, count]) => (
                                      <div key={collection}>
                                        ✓ {collection}: {count} documents deleted
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        )}

                        <div className="flex gap-2">
                          <Button
                            onClick={handleClearDatabase}
                            disabled={clearing || confirmationCode !== 'DELETE_ALL_DATA'}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            {clearing ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Clearing...
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Confirm Delete
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => {
                              setShowClearConfirm(false);
                              setConfirmationCode('');
                            }}
                            variant="outline"
                            className="border-slate-300"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Instructions */}
              <Card className="p-4 border-blue-200 bg-blue-50">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Admin Setup Instructions</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>
                    <strong>Bootstrap First Admin:</strong> Go to Firestore Console → users collection →
                    Create/Edit your user document → Set <code className="bg-blue-100 px-1 rounded">role: "admin"</code>
                  </p>
                  <p>
                    <strong>Grant Admin to Others:</strong> Use the <code className="bg-blue-100 px-1 rounded">setUserAdmin</code> Cloud Function
                    from this panel (feature coming soon) or manually edit their user document.
                  </p>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
