"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  HomeIcon,
  PersonIcon,
  GearIcon,
  FileTextIcon,
  BarChartIcon,
  BellIcon,
  MagnifyingGlassIcon,
  InfoCircledIcon,
  CalendarIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import AppSidebar from "./sidebar";

const sidebarItems = [
  { icon: HomeIcon, label: "Dashboard", href: "#" },
  { icon: BarChartIcon, label: "Analytics", href: "#" },
  { icon: FileTextIcon, label: "Documents", href: "#" },
  { icon: PersonIcon, label: "Team", href: "#" },
  { icon: GearIcon, label: "Settings", href: "#" },
];

const projects = [
  { id: 1, name: "Project Alpha", status: "active", progress: 75 },
  { id: 2, name: "Project Beta", status: "pending", progress: 45 },
  { id: 3, name: "Project Gamma", status: "completed", progress: 100 },
];

interface ThemePreviewProps {
  showPreview?: boolean;
  onContinueEditing?: () => void;
}

export default function ThemePreview({ showPreview = false, onContinueEditing }: ThemePreviewProps) {
  const [notifications, setNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Theme Preview</h2>
        {showPreview && onContinueEditing && (
          <Button 
            onClick={onContinueEditing}
            variant="default"
            size="lg"
            className="gap-2"
          >
            Continue Editing
          </Button>
        )}
      </div>
      <div className="w-full border rounded-lg bg-background overflow-hidden relative">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-[800px] w-full relative">
          {/* Sidebar */}
          <AppSidebar />  
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
            {/* Header */}
            <header className="border-b px-4 py-3 bg-card flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <SidebarTrigger className="-ml-1" />
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 h-9 w-[200px] text-sm"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
                      <BellIcon className="h-5 w-5" />
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[220px]">
                    <DropdownMenuLabel className="text-sm">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm">New message</DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">Update available</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-sm">JD</AvatarFallback>
                </Avatar>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 min-h-0 p-4 bg-background overflow-hidden">
              <div className="h-full flex flex-col gap-4">
                {/* Stats Cards */}
                <div className="grid gap-3 grid-cols-3 flex-shrink-0">
                  <Card>
                    <CardHeader className="p-4 pb-3">
                      <CardDescription className="text-sm">Projects</CardDescription>
                      <CardTitle className="text-2xl">24</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-success">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-3">
                      <CardDescription className="text-sm">Users</CardDescription>
                      <CardTitle className="text-2xl">1,429</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-success">+8% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4 pb-3">
                      <CardDescription className="text-sm">Rate</CardDescription>
                      <CardTitle className="text-2xl">89%</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-warning">-2% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Alert */}
                <Alert className="py-3 flex-shrink-0">
                  <InfoCircledIcon className="h-4 w-4" />
                  <AlertTitle className="text-sm mb-1">Theme Preview</AlertTitle>
                  <AlertDescription className="text-sm">
                    All components styled with your theme
                  </AlertDescription>
                </Alert>

                {/* Main Content Grid */}
                <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 overflow-hidden">
                  {/* Left Column */}
                  <div className="flex flex-col gap-4 min-h-0 overflow-auto">
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader className="p-4 flex-shrink-0">
                        <CardTitle className="text-base">Active Projects</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-3">
                          {projects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-3 rounded-md border bg-card">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{project.name}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <Progress value={project.progress} className="h-2 flex-1" />
                                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  project.status === "completed"
                                    ? "default"
                                    : project.status === "active"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="ml-3 text-xs"
                              >
                                {project.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader className="p-4 flex-shrink-0">
                        <CardTitle className="text-base flex items-center gap-2">
                          <ActivityLogIcon className="h-4 w-4" />
                          Activity Chart
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="h-[160px] flex items-end justify-between gap-1.5">
                          {[65, 45, 78, 52, 88, 42, 70, 59, 85, 48, 92, 67].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end">
                              <div
                                className="bg-primary rounded-t"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-3">
                          <span>Jan</span>
                          <span>Dec</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader className="p-4 flex-shrink-0">
                        <CardTitle className="text-base">Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Notifications</Label>
                          <Switch
                            checked={notifications}
                            onCheckedChange={setNotifications}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lang" className="text-sm">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="lang" className="h-10 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="user" className="text-sm">Username</Label>
                          <Input
                            id="user"
                            defaultValue="johndoe"
                            className="h-10 text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox id="terms2" className="h-4 w-4" />
                          <Label htmlFor="terms2" className="text-sm font-normal">
                            Accept terms and conditions
                          </Label>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-3 flex justify-end gap-2 border-t flex-shrink-0">
                        <Button variant="outline" size="sm" className="h-9 text-sm px-4">Cancel</Button>
                        <Button size="sm" className="h-9 text-sm px-4">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4 min-h-0 overflow-auto">
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader className="p-4 flex-shrink-0">
                        <CardTitle className="text-base">Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-4">
                        {[
                          { label: "CPU Usage", value: 45 },
                          { label: "Memory", value: 67 },
                          { label: "Storage", value: 89 },
                        ].map((metric) => (
                          <div key={metric.label} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{metric.label}</span>
                              <span className="font-medium">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader className="p-4 flex-shrink-0">
                        <CardTitle className="text-base flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-3">
                          {[
                            { title: "Team Meeting", time: "10:00 AM", color: "bg-primary" },
                            { title: "Design Review", time: "2:00 PM", color: "bg-secondary" },
                            { title: "Project Demo", time: "4:30 PM", color: "bg-accent" },
                            { title: "Client Call", time: "5:00 PM", color: "bg-primary" },
                          ].map((event, i) => (
                            <div key={i} className="flex gap-3 p-3 rounded-md border bg-card">
                              <div className={`w-1 rounded-full ${event.color}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="overflow-hidden flex flex-col flex-1">
                      <CardHeader className="p-4 flex-shrink-0">
                        <CardTitle className="text-base">Calendar</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-1 flex items-center justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
      </div>
    </div>
  );
}
