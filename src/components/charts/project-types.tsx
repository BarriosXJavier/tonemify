import { Pie, PieChart } from "recharts";
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

const projectTypes = [
  { name: "E-commerce", value: 35 },
  { name: "Corporate", value: 25 },
  { name: "Blog", value: 20 },
  { name: "Portfolio", value: 15 },
  { name: "Other", value: 5 },
];

const chartConfigs = {
  value: {
    label: "Projects",
    color: "hsl(var(--chart-3))",
  },
};

export function ProjectTypesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Project Types</CardTitle>
        <CardDescription>
          Distribution of web development projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigs}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <PieChart width={350} height={300}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={projectTypes}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                fill={chartConfigs.value.color}
                label
              />
            </PieChart>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
