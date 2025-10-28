// src/app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Database, Trash2, Users } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [adminPanelOpen, setAdminPanelOpen] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <Shield className="w-10 h-10 text-violet-600" />
                Admin Control Center
              </h1>
              <p className="text-slate-600">
                Database management, user administration, and system controls
              </p>
            </div>
            <Button
              onClick={() => setAdminPanelOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white gap-2"
            >
              <Shield className="w-5 h-5" />
              Open Admin Panel
            </Button>
          </div>

          {/* Admin Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Database Management */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-violet-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Database Management</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Seed the database with realistic demo data or clear all collections for a fresh start.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Generate 10 suppliers with full details</li>
                <li>• Create 50 raw materials across categories</li>
                <li>• Build 5 production recipes</li>
                <li>• Populate 100 orders with line items</li>
                <li>• Add 200+ traceability events</li>
              </ul>
            </div>

            {/* User Management */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-violet-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Grant or revoke admin privileges for users in your organization.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Set user roles (admin/user)</li>
                <li>• View all registered users</li>
                <li>• Manage permissions</li>
                <li>• Track admin activities</li>
              </ul>
            </div>

            {/* System Controls */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-violet-300 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-violet-100 rounded-lg">
                  <Shield className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">System Controls</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Configure system settings, monitor performance, and manage integrations.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Configure AI model settings</li>
                <li>• Manage Firebase integrations</li>
                <li>• Monitor Cloud Functions</li>
                <li>• View system logs</li>
              </ul>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-200 rounded-lg">
                <Shield className="w-6 h-6 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  ⚠️ Admin Access Required
                </h3>
                <p className="text-sm text-amber-800 mb-3">
                  This page requires administrator privileges. If you don't have admin access yet:
                </p>
                <ol className="text-sm text-amber-800 space-y-2 list-decimal list-inside">
                  <li>
                    Go to your Firebase Console → Firestore Database
                  </li>
                  <li>
                    Navigate to the <code className="bg-amber-100 px-2 py-0.5 rounded text-xs">users</code> collection
                  </li>
                  <li>
                    Find or create your user document (using your Firebase Auth UID)
                  </li>
                  <li>
                    Add the field: <code className="bg-amber-100 px-2 py-0.5 rounded text-xs">role</code> with value <code className="bg-amber-100 px-2 py-0.5 rounded text-xs">"admin"</code>
                  </li>
                  <li>
                    Refresh this page to verify admin access
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setAdminPanelOpen(true)}
                variant="outline"
                className="gap-2"
              >
                <Database className="w-4 h-4" />
                Seed Database
              </Button>
              <Button
                onClick={() => setAdminPanelOpen(true)}
                variant="outline"
                className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Clear Database
              </Button>
              <Button
                onClick={() => setAdminPanelOpen(true)}
                variant="outline"
                className="gap-2"
              >
                <Users className="w-4 h-4" />
                Manage Users
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel isOpen={adminPanelOpen} onClose={() => setAdminPanelOpen(false)} />
    </ThemeProvider>
  );
}
