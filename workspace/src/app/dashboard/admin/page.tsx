
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
import { Loader2, Database, Trash2, ShieldCheck, Wifi, Bot, UserPlus, Shield } from 'lucide-react';
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
import { FileUpload } from '@/components/storage/FileUpload';
import { FileManager } from '@/components/storage/FileManager';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getFunctions, httpsCallable } from 'firebase/functions';

function HealthStatus({ title, status, Icon }: { title: string, status: 'Operational' | 'Error' | 'Checking...', Icon: React.ElementType }) {
  const statusColor = status === 'Operational' ? 'text-green-500' : status === 'Error' ? 'text-red-500' : 'text-yellow-500';
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${status === 'Operational' ? 'bg-green-500' : status === 'Error' ? 'bg-red-500' : 'bg-yellow-500'}`} />
        <span className={`text-sm font-medium ${statusColor}`}>{status}</span>
      </div>
    </div>
  );
}


export default function AdminPage() {
  const { user, isAdmin, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [fileManagerKey, setFileManagerKey] = useState(Date.now());
  const [emailToMakeAdmin, setEmailToMakeAdmin] = useState('');
  const [isSettingRole, setIsSettingRole] = useState(false);

  const onUploadComplete = () => {
    setFileManagerKey(Date.now()); // Re-mount FileManager to fetch new files
  };

  const handleSetUserRole = async (role: 'admin' | 'user') => {
    if (!emailToMakeAdmin) {
      toast({
        variant: 'destructive',
        title: 'Email is required',
      });
      return;
    }
    setIsSettingRole(true);
    try {
      const functions = getFunctions();
      const setUserRole = httpsCallable(functions, 'setUserRole');
      const result = await setUserRole({ email: emailToMakeAdmin, role });
      toast({
        title: 'Success',
        description: (result.data as any).message,
      });
      setEmailToMakeAdmin('');
    } catch (error: any) {
      console.error('Error setting user role:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to set user role',
        description: error.message,
      });
    } finally {
      setIsSettingRole(false);
    }
  };

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

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title="Admin" />
        <main className="flex-1 p-4 sm:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Verifying permissions...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!user || !isAdmin) {
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
              <p>Please contact an administrator to grant you access.</p>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  Seed
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
                <div>
                  <h3 className="font-semibold text-destructive">
                    Clear Database
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete all data.
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
                      Clear
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
              <CardTitle>System Health</CardTitle>
              <CardDescription>
                Live status of core application services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <HealthStatus title="Firebase Services" status={user ? 'Operational' : 'Error'} Icon={Wifi} />
                <HealthStatus title="Authentication" status={isUserLoading ? 'Checking...' : user ? 'Operational' : 'Error'} Icon={ShieldCheck} />
                <HealthStatus title="AI Services" status="Operational" Icon={Bot} />
            </CardContent>
           </Card>
           <Card>
            <CardHeader>
              <CardTitle>User Role Management</CardTitle>
              <CardDescription>Grant or revoke admin privileges.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="email-role">User Email</Label>
                    <Input id="email-role" placeholder="user@example.com" value={emailToMakeAdmin} onChange={(e) => setEmailToMakeAdmin(e.target.value)} />
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleSetUserRole('admin')} disabled={isSettingRole} className="w-full">
                        {isSettingRole ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                        Make Admin
                    </Button>
                     <Button onClick={() => handleSetUserRole('user')} disabled={isSettingRole} variant="secondary" className="w-full">
                        {isSettingRole ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                        Make User
                    </Button>
                </div>
            </CardContent>
           </Card>
           <Card className="lg:col-span-3">
             <CardHeader>
                <CardTitle>File Storage</CardTitle>
                <CardDescription>Upload and manage documents.</CardDescription>
            </CardHeader>
            <CardContent>
                <FileUpload onUploadComplete={onUploadComplete} />
            </CardContent>
           </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>File Manager</CardTitle>
                <CardDescription>View and manage all uploaded files.</CardDescription>
            </CardHeader>
             <CardContent>
                <FileManager key={fileManagerKey} />
             </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
