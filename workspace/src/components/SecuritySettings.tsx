'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  ShieldCheck,
  Bell,
  KeyRound,
  Laptop,
  LogOut,
  History,
  Eye,
  EyeOff,
  Copy,
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function SecuritySettings() {
  const { toast } = useToast();
  const [showApi, setShowApi] = useState(false);
  const apiKey = 'sk-**********************************1234';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast({ title: 'API Key copied to clipboard.' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Settings</CardTitle>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication (2FA)</Label>
              <p className="text-xs text-muted-foreground">
                Enhance security by requiring a second verification step.
              </p>
            </div>
            <Switch id="two-factor" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Receive an email notification for logins from new devices.
              </p>
            </div>
            <Switch id="login-alerts" defaultChecked />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
          <CardDescription>
            Manage your API keys for third-party integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
              <p className="font-mono text-sm">
                {showApi ? apiKey : `sk-**********************************${apiKey.slice(-4)}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setShowApi(!showApi)}>
                {showApi ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            These are the devices that are currently logged into your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Laptop className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Chrome on macOS</p>
                <p className="text-xs text-muted-foreground">Current session</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Revoke
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
