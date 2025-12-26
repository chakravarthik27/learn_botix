'use client';

import React from 'react';
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Logout Failed",
          description: error.message || "An error occurred during logout.",
        });
        return;
      }

      // Clear session from localStorage
      localStorage.removeItem('supabase_session');
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      // Redirect to login page
      router.push('/login');
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred during logout.",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Avatar>
              <AvatarImage src="/path/to/profile-picture.jpg" alt="Profile Picture" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold">User Name</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Courses</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Assessments</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Practice Playground</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <button className="text-sm text-gray-600">Settings</button>
            <button className="text-sm text-gray-600" onClick={handleLogout}>Logout</button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">
          <Tabs defaultValue="courses">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="playground">Practice Playground</TabsTrigger>
            </TabsList>
            <TabsContent value="courses">
              <h2 className="text-2xl font-bold">Courses</h2>
              <p>List of courses...</p>
            </TabsContent>
            <TabsContent value="assessments">
              <h2 className="text-2xl font-bold">Assessments</h2>
              <p>List of assessments...</p>
            </TabsContent>
            <TabsContent value="playground">
              <h2 className="text-2xl font-bold">Practice Playground</h2>
              <p>Practice playground content...</p>
            </TabsContent>
          </Tabs>
          <div className="mt-4">
            <Alert>
              <AlertTitle>Notification</AlertTitle>
              <AlertDescription>You have 3 new messages.</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
