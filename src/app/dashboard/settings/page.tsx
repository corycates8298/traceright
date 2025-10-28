'use client';

import { useState } from 'react';
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
  User,
  Bell,
  Shield,
  Palette,
  Settings as SettingsIcon,
  Save,
  Mail,
  Phone,
  Building,
  Calendar,
  Globe
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useUser();
  const { toast } = useToast();

  // User Profile State
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // Notification Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);

  // Application Preferences
  const [autoSave, setAutoSave] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile settings have been saved successfully.',
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Notifications Updated',
      description: 'Your notification preferences have been saved.',
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: 'Preferences Updated',
      description: 'Your application preferences have been saved.',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Settings" />
      <main className="flex-1 p-4 sm:p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Profile
                </CardTitle>
                <CardDescription>
                  Manage your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{displayName || 'User'}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                    <Badge className="mt-1">Active Account</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="pl-10"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="pl-10"
                        placeholder="Your Company Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Account Created</Label>
                    <div className="font-medium">
                      {user?.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Sign In</Label>
                    <div className="font-medium">
                      {user?.metadata?.lastSignInTime
                        ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                        : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">User ID</Label>
                    <div className="font-mono text-sm">{user?.uid || 'N/A'}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email Verified</Label>
                    <Badge variant={user?.emailVerified ? 'default' : 'secondary'}>
                      {user?.emailVerified ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Get instant alerts in your browser
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">
                        Receive weekly summary reports
                      </div>
                    </div>
                    <Switch
                      checked={weeklyReports}
                      onCheckedChange={setWeeklyReports}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">System Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Critical system updates and maintenance
                      </div>
                    </div>
                    <Switch
                      checked={systemAlerts}
                      onCheckedChange={setSystemAlerts}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveNotifications} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Application Preferences
                </CardTitle>
                <CardDescription>
                  Customize how the application works for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Auto-Save</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically save changes as you work
                      </div>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Compact View</div>
                      <div className="text-sm text-muted-foreground">
                        Show more content in less space
                      </div>
                    </div>
                    <Switch checked={compactView} onCheckedChange={setCompactView} />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Show Tooltips</div>
                      <div className="text-sm text-muted-foreground">
                        Display helpful hints and information
                      </div>
                    </div>
                    <Switch checked={showTooltips} onCheckedChange={setShowTooltips} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSavePreferences} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme & Appearance
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="text-sm mb-2">
                    Use the Theme Customizer in the bottom-right corner to adjust colors, themes, and visual preferences.
                  </div>
                  <Badge variant="outline">Theme Customizer Available</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Password</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Last changed: Never
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account
                    </div>
                    <Badge variant="secondary">Not Enabled</Badge>
                    <Button variant="outline" className="ml-4">Enable 2FA</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-2">Active Sessions</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Manage devices where you're currently signed in
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>

                  <div className="p-4 border rounded-lg border-red-200 bg-red-50 dark:bg-red-950/20">
                    <div className="font-semibold mb-2 text-red-600">Danger Zone</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
