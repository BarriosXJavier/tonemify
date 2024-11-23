import { AreaChart, Area, XAxis, YAxis } from "recharts";
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

const PerformanceMetrics = () => {
  const data = [
    { name: "Q1", projects: 40, bugs: 24, target: 30 },
    { name: "Q2", projects: 30, bugs: 14, target: 28 },
    { name: "Q3", projects: 20, bugs: 18, target: 24 },
    { name: "Q4", projects: 28, bugs: 9, target: 26 },
  ];

  const chartConfigs = {
    projects: {
      label: "Projects",
      color: "hsl(var(--chart-5))",
    },
    bugs: {
      label: "Bugs",
      color: "hsl(var(--chart-2))",
    },
    target: {
      label: "Target",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary dark:text-foreground">
          Performance Metrics
        </CardTitle>
        <CardDescription>
          Quarterly performance metrics including projects, bugs, and targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigs} className="h-[300px]">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            height={300}
            width={350}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="projects"
              stroke={chartConfigs.projects.color}
              fill={chartConfigs.projects.color}
            />
            <Area
              type="monotone"
              dataKey="bugs"
              stroke={chartConfigs.bugs.color}
              fill={chartConfigs.bugs.color}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke={chartConfigs.target.color}
              fill={chartConfigs.target.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
