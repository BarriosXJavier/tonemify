import { Line, LineChart } from "recharts";
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

const clientSatisfaction = [
  { month: "Jan", satisfaction: 4.2 },
  { month: "Feb", satisfaction: 4.5 },
  { month: "Mar", satisfaction: 4.7 },
  { month: "Apr", satisfaction: 4.8 },
  { month: "May", satisfaction: 4.9 },
  { month: "Jun", satisfaction: 5.0 },
];

const chartConfigs = {
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(var(--chart-2))",
  },
};

export function ClientSatisfactionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary dark:text-foreground">
          Client Satisfaction
        </CardTitle>
        <CardDescription>
          Average monthly satisfaction score (out of 5)
        </CardDescription>
      </CardHeader>
      <div className="relative h-[300px] w-full overflow-x-auto">
        <CardContent>
          <ChartContainer config={chartConfigs}>
            <LineChart data={clientSatisfaction} width={600} height={200}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke={chartConfigs.satisfaction.color}
                strokeWidth={4}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </div>
    </Card>
  );
}
