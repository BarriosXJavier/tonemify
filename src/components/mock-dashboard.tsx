"use client";

import React from "react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Bell,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const chartConfigs = {
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(var(--chart-2))",
  },
  value: {
    label: "Projects",
    color: "hsl(var(--chart-3))",
  },
};

const safeData = (data) =>
  data.map((item) => ({
    ...item,
    projects: item.projects || 0,
    satisfaction: item.satisfaction || 0,
    value: item.value || 0,
  }));

const projectsPerMonth = [
  { month: "Jan", projects: 4 },
  { month: "Feb", projects: 6 },
  { month: "Mar", projects: 8 },
  { month: "Apr", projects: 10 },
  { month: "May", projects: 12 },
  { month: "Jun", projects: 9 },
];

const clientSatisfaction = [
  { month: "Jan", satisfaction: 4.2 },
  { month: "Feb", satisfaction: 4.5 },
  { month: "Mar", satisfaction: 4.7 },
  { month: "Apr", satisfaction: 4.8 },
  { month: "May", satisfaction: 4.9 },
  { month: "Jun", satisfaction: 5.0 },
];

const projectTypes = [
  { name: "E-commerce", value: 35 },
  { name: "Corporate", value: 25 },
  { name: "Blog", value: 20 },
  { name: "Portfolio", value: 15 },
  { name: "Other", value: 5 },
];

const recentProjects = [
  { name: "E-commerce Platform", client: "TechGear", status: "In Progress" },
  {
    name: "Corporate Website Redesign",
    client: "EvilCorp",
    status: "Completed",
  },
  { name: "Blog Migration", client: "FoodieFinds", status: "In Review" },
  { name: "Portfolio Showcase", client: "ArtistX", status: "Planning" },
];

export default function TonemifyDashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-muted/40 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <BarChart3 className="mr-2 h-6 w-6" />
            <span className="font-bold">Tonemify</span>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Clients
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center border-b px-4">
          <Button variant="ghost" className="mr-2 lg:hidden">
            <BarChart3 className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <Input className="max-w-sm" placeholder="Search..." />
          </div>
          <Button variant="ghost" size="icon" className="mr-2">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">Dashboard</h1>

          {/* Charts */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Projects Completed</CardTitle>
                <CardDescription>
                  Monthly breakdown of completed projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigs}
                  className="h-[200px] md:h-[300px]"
                >
                  <BarChart data={safeData(projectsPerMonth)}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="projects"
                      fill="var(--color-projects)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Satisfaction</CardTitle>
                <CardDescription>
                  Average monthly satisfaction score (out of 5)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigs}
                  className="h-[200px] md:h-[300px]"
                >
                  <LineChart data={safeData(clientSatisfaction)}>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="var(--color-satisfaction)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Types</CardTitle>
                <CardDescription>
                  Distribution of web development projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfigs}
                  className="h-[200px] md:h-[300px]"
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={safeData(projectTypes)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="var(--color-value)"
                      label
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Overview of the latest project activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">
                        Project Name
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Client
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="px-4 py-2">{project.name}</td>
                        <td className="px-4 py-2">{project.client}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                              project.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : project.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : project.status === "In Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
