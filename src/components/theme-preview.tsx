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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Theme Preview</h2>
        {showPreview && onContinueEditing && (
          <Button 
            onClick={onContinueEditing}
            variant="default"
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            Continue Editing
          </Button>
        )}
      </div>
      <div className="w-full border rounded-lg overflow-hidden relative">
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-[600px] sm:h-[700px] lg:h-[800px] w-full relative">
          {/* Sidebar */}
          <AppSidebar />  
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
            {/* Header */}
            <header className="border-b px-3 sm:px-4 py-3 bg-card flex items-center justify-between flex-shrink-0 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <SidebarTrigger className="-ml-1" />
                <h1 className="text-base sm:text-xl font-semibold truncate">Dashboard</h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div className="relative hidden sm:block">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 h-9 w-[150px] md:w-[200px] text-sm"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0 relative">
                      <BellIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-2 w-2 rounded-full bg-destructive" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] sm:w-[220px]">
                    <DropdownMenuLabel className="text-sm">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-sm">New message</DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">Update available</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                  <AvatarFallback className="text-xs sm:text-sm">JD</AvatarFallback>
                </Avatar>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 min-h-0 p-3 sm:p-4 bg-background overflow-hidden">
              <div className="h-full flex flex-col gap-3 sm:gap-4">
                {/* Stats Cards */}
                <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-shrink-0">
                  <Card>
                    <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                      <CardDescription className="text-xs sm:text-sm">Projects</CardDescription>
                      <CardTitle className="text-xl sm:text-2xl">24</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <p className="text-xs sm:text-sm text-success">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                      <CardDescription className="text-xs sm:text-sm">Users</CardDescription>
                      <CardTitle className="text-xl sm:text-2xl">1,429</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <p className="text-xs sm:text-sm text-success">+8% from last month</p>
                    </CardContent>
                  </Card>

                  <Card className="sm:col-span-2 lg:col-span-1">
                    <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                      <CardDescription className="text-xs sm:text-sm">Rate</CardDescription>
                      <CardTitle className="text-xl sm:text-2xl">89%</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <p className="text-xs sm:text-sm text-warning">-2% from last month</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Alert */}
                <Alert className="py-2 sm:py-3 flex-shrink-0">
                  <InfoCircledIcon className="h-4 w-4" />
                  <AlertTitle className="text-xs sm:text-sm mb-1">Theme Preview</AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm">
                    All components styled with your theme
                  </AlertDescription>
                </Alert>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 overflow-auto">
                  {/* Left Column */}
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <Card>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base">Active Projects</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <div className="space-y-2 sm:space-y-3">
                          {projects.map((project) => (
                            <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 rounded-md border bg-card gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium truncate">{project.name}</p>
                                <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
                                  <Progress value={project.progress} className="h-1.5 sm:h-2 flex-1" />
                                  <span className="text-xs sm:text-sm text-muted-foreground">{project.progress}%</span>
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
                                className="ml-0 sm:ml-3 text-xs self-start sm:self-auto"
                              >
                                {project.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                          <ActivityLogIcon className="h-4 w-4" />
                          Activity Chart
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <div className="h-[120px] sm:h-[160px] flex items-end justify-between gap-1 sm:gap-1.5">
                          {[65, 45, 78, 52, 88, 42, 70, 59, 85, 48, 92, 67].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end">
                              <div
                                className="bg-primary rounded-t"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
                          <span>Jan</span>
                          <span>Dec</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base">Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs sm:text-sm font-medium">Notifications</Label>
                          <Switch
                            checked={notifications}
                            onCheckedChange={setNotifications}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lang" className="text-xs sm:text-sm">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="lang" className="h-9 sm:h-10 text-xs sm:text-sm">
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
                          <Label htmlFor="user" className="text-xs sm:text-sm">Username</Label>
                          <Input
                            id="user"
                            defaultValue="johndoe"
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox id="terms2" className="h-4 w-4" />
                          <Label htmlFor="terms2" className="text-xs sm:text-sm font-normal">
                            Accept terms and conditions
                          </Label>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 sm:p-4 pt-2 sm:pt-3 flex flex-col sm:flex-row justify-end gap-2 border-t">
                        <Button variant="outline" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm px-3 sm:px-4 w-full sm:w-auto">Cancel</Button>
                        <Button size="sm" className="h-8 sm:h-9 text-xs sm:text-sm px-3 sm:px-4 w-full sm:w-auto">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <Card>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base">Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
                        {[
                          { label: "CPU Usage", value: 45 },
                          { label: "Memory", value: 67 },
                          { label: "Storage", value: 89 },
                        ].map((metric) => (
                          <div key={metric.label} className="space-y-2">
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="text-muted-foreground">{metric.label}</span>
                              <span className="font-medium">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-1.5 sm:h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { title: "Team Meeting", time: "10:00 AM", color: "bg-primary" },
                            { title: "Design Review", time: "2:00 PM", color: "bg-secondary" },
                            { title: "Project Demo", time: "4:30 PM", color: "bg-accent" },
                            { title: "Client Call", time: "5:00 PM", color: "bg-primary" },
                          ].map((event, i) => (
                            <div key={i} className="flex gap-2 sm:gap-3 p-2 sm:p-3 rounded-md border bg-card">
                              <div className={`w-1 rounded-full ${event.color}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium truncate">{event.title}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">{event.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base">Calendar</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0 flex items-center justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border scale-90 sm:scale-100"
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
