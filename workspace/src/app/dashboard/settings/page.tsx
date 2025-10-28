'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, User, Mail, Key, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useFeatures } from '@/context/features-context';

export default function SettingsPage() {
  const { user } = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { showcaseEnabled, setShowcaseEnabled } = useFeatures();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBootstrapping, setIsBootstrapping] = useState(false);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user || !firestore) {
        setIsLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.isAdmin === true || userData.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminStatus();
  }, [user, firestore]);

  const handleBootstrapAdmin = async () => {
    if (!user || !firestore) {
      toast({
        title: 'Error',
        description: 'You must be logged in to perform this action',
        variant: 'destructive',
      });
      return;
    }

    setIsBootstrapping(true);

    try {
      // Create admin user document
      await setDoc(
        doc(firestore, 'users', user.uid),
        {
          email: user.email,
          role: 'admin',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          bootstrapped: true,
        },
        { merge: true }
      );

      setIsAdmin(true);

      toast({
        title: 'Success!',
        description: 'You are now an administrator. Refresh the page to access all features.',
      });

      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error bootstrapping admin:', error);
      toast({
        title: 'Error',
        description: `Failed to grant admin privileges: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setIsBootstrapping(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title="Settings" />
        <main className="flex-1 p-4 sm:p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Settings" />
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>
              Your account information and current status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">User ID</span>
                      {isAdmin && (
                        <Badge variant="default" className="gap-1">
                          <Shield className="h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <code className="text-sm text-muted-foreground">{user.uid}</code>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Email Address</span>
                    <div className="text-sm text-muted-foreground">{user.email || 'No email'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">Account Status</span>
                    <div className="text-sm text-muted-foreground">
                      {isAdmin ? 'Administrator' : 'Standard User'}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Not logged in
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admin Bootstrap Card */}
        {user && !isAdmin && (
          <Card className="border-orange-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-500" />
                Administrator Access
              </CardTitle>
              <CardDescription>
                Grant yourself administrator privileges to access all features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 p-4 text-sm text-orange-800 dark:text-orange-200">
                <p className="font-medium mb-2">Bootstrap Admin Access</p>
                <p>
                  You need administrator privileges to access the Admin Panel and seed the database
                  with test data. Click the button below to grant yourself admin access.
                </p>
              </div>
              <Button
                onClick={handleBootstrapAdmin}
                disabled={isBootstrapping}
                className="w-full"
                size="lg"
              >
                {isBootstrapping ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Granting Admin Access...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Grant Admin Access
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Admin Success Card */}
        {user && isAdmin && (
          <Card className="border-green-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Shield className="h-5 w-5" />
                Administrator Active
              </CardTitle>
              <CardDescription>
                You have full access to all administrative features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4 text-sm text-green-800 dark:text-green-200">
                <p className="font-medium mb-2">Admin Features Available:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Seed database with test data</li>
                  <li>Clear all database collections</li>
                  <li>Grant admin privileges to other users</li>
                  <li>Access all dashboard features</li>
                </ul>
              </div>
              <Button
                onClick={() => window.location.href = '/dashboard/admin'}
                className="w-full"
                variant="outline"
              >
                Go to Admin Panel
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Demo Features Control */}
        <Card className="border-violet-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-600" />
              Demo Features
            </CardTitle>
            <CardDescription>
              Control visibility of showcase features for demonstrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-violet-50 dark:bg-violet-950/20 p-4 text-sm text-violet-800 dark:text-violet-200">
              <p className="font-medium mb-2">SHOWCASE Section Control</p>
              <p>
                Toggle the SHOWCASE section in the sidebar to reveal or hide Next-Gen Features
                and Google Sheets Demo during presentations. Perfect for controlling your demo flow.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
              <div className="flex items-center gap-3">
                {showcaseEnabled ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-slate-400" />
                )}
                <div>
                  <Label htmlFor="showcase-toggle" className="text-base font-semibold cursor-pointer">
                    Show SHOWCASE Features
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {showcaseEnabled
                      ? 'SHOWCASE section is visible in sidebar'
                      : 'SHOWCASE section is hidden'}
                  </p>
                </div>
              </div>
              <Switch
                id="showcase-toggle"
                checked={showcaseEnabled}
                onCheckedChange={(checked) => {
                  setShowcaseEnabled(checked);
                  toast({
                    title: checked ? 'SHOWCASE Enabled' : 'SHOWCASE Hidden',
                    description: checked
                      ? 'Next-Gen Features are now visible in the sidebar'
                      : 'SHOWCASE section has been hidden from the sidebar',
                  });
                }}
              />
            </div>

            {showcaseEnabled && (
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4 text-sm text-green-800 dark:text-green-200 border border-green-500/20">
                <p className="font-medium mb-2">SHOWCASE Features Active</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>✨ Next-Gen Features - Innovation showcase</li>
                  <li>📊 Google Sheets Demo - Live integration demo</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Theme Settings Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>
              Configure application preferences and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[20vh] border-2 border-dashed rounded-lg">
              <div className="text-center">
                <h3 className="text-xl font-bold tracking-tight">
                  Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Additional settings will be available here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
