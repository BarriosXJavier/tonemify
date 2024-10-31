"use client";

import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  Users,
  Palette,
  Download,
  TrendingUp,
  Calendar,
  Filter,
  RefreshCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import PerformanceMetrics from "./perfomance-chart";
import { MarketShare } from "./market-share";

const Preview = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Sample data
  const revenueData = [
    { name: "Jan", revenue: 4000, profit: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398 },
    { name: "Mar", revenue: 2000, profit: 9800 },
    { name: "Apr", revenue: 2780, profit: 3908 },
    { name: "May", revenue: 1890, profit: 4800 },
    { name: "Jun", revenue: 2390, profit: 3800 },
  ];

  const marketShare = [
    { name: "Service A", value: 400 },
    { name: "Service B", value: 300 },
    { name: "Service C", value: 300 },
    { name: "Service D", value: 200 },
  ];

  const topPerformers = [
    { name: "Alice Johnson", projects: 24, status: "Excellent" },
    { name: "Bob Smith", projects: 19, status: "Good" },
    { name: "Carol White", projects: 17, status: "Good" },
    { name: "David Brown", projects: 15, status: "Average" },
  ];

  const pieColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

  const stats = [
    {
      title: "Total Projects",
      value: "54",
      change: "+14.5%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Active Clients",
      value: "27",
      change: "+28.4%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Downloads",
      value: "128",
      change: "-3.2%",
      icon: Download,
      trend: "down",
    },
    {
      title: "Engagement",
      value: "89%",
      change: "+7.3%",
      icon: Palette,
      trend: "up",
    },
  ];

  const chartConfig: ChartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="p-8 space-y-6">
      <Card className="my-10 border-2 border-accent/20 bg-background/95 dark:bg-background/80 shadow-lg hover:shadow-accent/10 transition-all">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-accent dark:text-primary">
            Components Preview
          </CardTitle>
          <CardDescription className="text-lg text-center text-primary/20 dark:text-foreground/50">
            Explore the theming of various UI components below.
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tonenemify Dashboard</h1>
          <p className="text-muted-foreground">Complete overview</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                All Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("projects")}>
                Projects Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("clients")}>
                Clients Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue and profit analysis
            </CardDescription>
          </CardHeader>
          <CardContent>{/* Revenue Chart */}</CardContent>
        </Card>

        {/* Market Share Pie Chart */}

        <Card>
          <CardHeader>
            <CardTitle>Market Distribution</CardTitle>
            <CardDescription>Service market share</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketShare />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Quarterly performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>{/* Perfomance chart */}</CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Best performing team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/api/placeholder/${40 + index}/40`} />
                      <AvatarFallback>
                        {performer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {performer.projects} projects
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      performer.status === "Excellent"
                        ? "default"
                        : performer.status === "Good"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {performer.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Comprehensive metrics breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{stat.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.value}
                      </span>
                    </div>
                    <Progress value={parseFloat(stat.change)} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="space-y-4">
                {marketShare.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.value}
                      </span>
                    </div>
                    <Progress value={item.value / 10} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
     
    </div>
  );
};

export default Preview;
