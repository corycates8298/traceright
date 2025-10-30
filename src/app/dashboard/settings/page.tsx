'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth, useFirestore } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, User, Mail, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecuritySettings } from '@/components/SecuritySettings';

export default function SettingsPage() {
  const { user } = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBootstrapping, setIsBootstrapping] = useState(false);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user || !firestore) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
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
      await setDoc(
        doc(firestore, 'users', user.uid),
        {
          role: 'admin',
          isAdmin: true,
        },
        { merge: true }
      );

      setIsAdmin(true);

      toast({
        title: 'Success!',
        description: 'You are now an administrator. Refresh the page to access all features.',
      });

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
      <main className="flex-1 p-4 sm:p-6">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your personal information and account status.
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
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Not logged in
                  </div>
                )}
              </CardContent>
            </Card>

            {user && !isAdmin && (
              <Card className="mt-6 border-orange-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Administrator Access
                  </CardTitle>
                  <CardDescription>
                    Grant yourself administrator privileges to access all features.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 p-4 text-sm text-orange-800 dark:text-orange-200">
                    <p>
                      You need admin privileges to access features like database seeding.
                      Click the button below to grant yourself admin access.
                    </p>
                  </div>
                  <Button
                    onClick={handleBootstrapAdmin}
                    disabled={isBootstrapping}
                    className="w-full"
                    size="lg"
                  >
                    {isBootstrapping ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Shield className="mr-2 h-4 w-4" />
                    )}
                    Grant Admin Access
                  </Button>
                </CardContent>
              </Card>
            )}

            {user && isAdmin && (
              <Card className="mt-6 border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Shield className="h-5 w-5" />
                    Administrator Active
                  </CardTitle>
                  <CardDescription>
                    You have full access to all administrative features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
