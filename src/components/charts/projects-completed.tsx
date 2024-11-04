import { Bar, BarChart } from "recharts";
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

const projectsPerMonth = [
  { month: "Jan", projects: 4 },
  { month: "Feb", projects: 6 },
  { month: "Mar", projects: 8 },
  { month: "Apr", projects: 10 },
  { month: "May", projects: 12 },
  { month: "Jun", projects: 9 },
];

const chartConfigs = {
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
};

export function ProjectsCompletedChart() {
  return (
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
          className="h-[300px] md:h-[300px]"
        >
          <BarChart data={projectsPerMonth} width={350} height={300}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="projects"
              fill={chartConfigs.projects.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
