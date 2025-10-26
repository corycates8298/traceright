'use client';

import { useState } from 'react';
import { useUser } from '@/firebase';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database, Trash2 } from 'lucide-react';
import { seedDatabase } from '@/ai/flows/seed-database';
import { clearDatabase } from '@/ai/flows/clear-database';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminPage() {
  // const { user } = useUser(); // Re-enable when auth is fully implemented
  const user = { role: 'admin' }; // Placeholder for admin role
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    toast({
      title: 'Database Seeding Started',
      description: 'This may take a minute. Please be patient...',
    });
    try {
      const result = await seedDatabase();
      toast({
        title: 'Database Seeding Successful',
        description: result.message,
      });
    } catch (error) {
      console.error('Seeding error:', error);
      toast({
        variant: 'destructive',
        title: 'Database Seeding Failed',
        description: 'Check the console for more details.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClear = async () => {
    setIsClearing(true);
    toast({
      title: 'Clearing Database',
      description: 'This may take a moment...',
    });
    try {
      const result = await clearDatabase();
      toast({
        title: 'Database Cleared',
        description: result.message,
      });
    } catch (error) {
      console.error('Clearing error:', error);
      toast({
        variant: 'destructive',
        title: 'Database Clearing Failed',
        description: 'Check the console for more details.',
      });
    } finally {
      setIsClearing(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title="Admin" />
        <main className="flex-1 p-4 sm:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to view this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please contact your system administrator.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Admin Panel" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>
                Use these actions to manage the demo data in Firestore.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">Seed Database</h3>
                  <p className="text-sm text-muted-foreground">
                    Populate Firestore with realistic fake data for the demo.
                  </p>
                </div>
                <Button onClick={handleSeed} disabled={isSeeding || isClearing}>
                  {isSeeding ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Database className="mr-2 h-4 w-4" />
                  )}
                  Seed Data
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
                <div>
                  <h3 className="font-semibold text-destructive">
                    Clear Database
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete all data from the collections.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={isClearing || isSeeding}
                    >
                      {isClearing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Clear Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all data from suppliers, materials, recipes, orders, inventory and more from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClear}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users, roles, and system settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[40vh] border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold tracking-tight">
                    Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    User and role management features will be available here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
