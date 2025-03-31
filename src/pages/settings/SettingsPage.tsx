
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Software engineer and amateur photographer. Passionate about technology, travel, and good coffee.",
    location: "San Francisco, CA",
    website: "johndoe.dev",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    directMessages: true,
    emailNotifications: false,
    pushNotifications: true,
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: false,
    showOnlineStatus: true,
    allowMessagesFromAnyone: true,
    showReadReceipts: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved",
      });
    }, 1000);
  };

  const handleSavePrivacy = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved",
      });
    }, 1000);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-none md:flex gap-1">
          <TabsTrigger value="profile" className="flex-1 md:flex-auto">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 md:flex-auto">Notifications</TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1 md:flex-auto">Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and how others see you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={profileForm.username}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileForm.location}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={profileForm.website}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveProfile}
                disabled={isSubmitting}
                className="bg-social hover:bg-social-hover"
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how Interacto looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label>Theme</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dark mode</span>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive and how
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Activity notifications</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="likes" className="flex-1 cursor-pointer">
                      Likes
                      <p className="text-sm text-muted-foreground">
                        When someone likes your posts
                      </p>
                    </Label>
                    <Switch
                      id="likes"
                      checked={notificationSettings.likes}
                      onCheckedChange={(checked) => handleNotificationChange("likes", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comments" className="flex-1 cursor-pointer">
                      Comments
                      <p className="text-sm text-muted-foreground">
                        When someone comments on your posts
                      </p>
                    </Label>
                    <Switch
                      id="comments"
                      checked={notificationSettings.comments}
                      onCheckedChange={(checked) => handleNotificationChange("comments", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="follows" className="flex-1 cursor-pointer">
                      Follows
                      <p className="text-sm text-muted-foreground">
                        When someone follows you
                      </p>
                    </Label>
                    <Switch
                      id="follows"
                      checked={notificationSettings.follows}
                      onCheckedChange={(checked) => handleNotificationChange("follows", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mentions" className="flex-1 cursor-pointer">
                      Mentions
                      <p className="text-sm text-muted-foreground">
                        When someone mentions you in a post
                      </p>
                    </Label>
                    <Switch
                      id="mentions"
                      checked={notificationSettings.mentions}
                      onCheckedChange={(checked) => handleNotificationChange("mentions", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="directMessages" className="flex-1 cursor-pointer">
                      Direct messages
                      <p className="text-sm text-muted-foreground">
                        When you receive a direct message
                      </p>
                    </Label>
                    <Switch
                      id="directMessages"
                      checked={notificationSettings.directMessages}
                      onCheckedChange={(checked) => handleNotificationChange("directMessages", checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Delivery methods</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications" className="flex-1 cursor-pointer">
                      Email notifications
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </Label>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications" className="flex-1 cursor-pointer">
                      Push notifications
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </Label>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveNotifications}
                disabled={isSubmitting}
                className="bg-social hover:bg-social-hover"
              >
                {isSubmitting ? "Saving..." : "Save preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your privacy and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account privacy</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="privateAccount" className="flex-1 cursor-pointer">
                      Private account
                      <p className="text-sm text-muted-foreground">
                        Only approved followers can see your posts
                      </p>
                    </Label>
                    <Switch
                      id="privateAccount"
                      checked={privacySettings.privateAccount}
                      onCheckedChange={(checked) => handlePrivacyChange("privateAccount", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showOnlineStatus" className="flex-1 cursor-pointer">
                      Online status
                      <p className="text-sm text-muted-foreground">
                        Show when you're active on the platform
                      </p>
                    </Label>
                    <Switch
                      id="showOnlineStatus"
                      checked={privacySettings.showOnlineStatus}
                      onCheckedChange={(checked) => handlePrivacyChange("showOnlineStatus", checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Messaging privacy</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowMessagesFromAnyone" className="flex-1 cursor-pointer">
                      Message requests
                      <p className="text-sm text-muted-foreground">
                        Allow messages from people you don't follow
                      </p>
                    </Label>
                    <Switch
                      id="allowMessagesFromAnyone"
                      checked={privacySettings.allowMessagesFromAnyone}
                      onCheckedChange={(checked) => handlePrivacyChange("allowMessagesFromAnyone", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showReadReceipts" className="flex-1 cursor-pointer">
                      Read receipts
                      <p className="text-sm text-muted-foreground">
                        Let others know when you've read their messages
                      </p>
                    </Label>
                    <Switch
                      id="showReadReceipts"
                      checked={privacySettings.showReadReceipts}
                      onCheckedChange={(checked) => handlePrivacyChange("showReadReceipts", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSavePrivacy}
                disabled={isSubmitting}
                className="bg-social hover:bg-social-hover"
              >
                {isSubmitting ? "Saving..." : "Save settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
