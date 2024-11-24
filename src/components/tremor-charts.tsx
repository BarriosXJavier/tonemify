"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import {
//   AreaChart,
//   BarChart,
//   DonutChart,
//   LineChart,
//   ScatterChart,
// } from "@tremor/react";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

// const monthlyData = [
//   {
//     month: "Jan",
//     visitors: 120,
//     uniqueVisitors: 80,
//     engagementRate: 65,
//     avgSessionDuration: 180,
//   },
//   {
//     month: "Feb",
//     visitors: 220,
//     uniqueVisitors: 100,
//     engagementRate: 70,
//     avgSessionDuration: 190,
//   },
//   {
//     month: "Mar",
//     visitors: 180,
//     uniqueVisitors: 120,
//     engagementRate: 75,
//     avgSessionDuration: 200,
//   },
//   {
//     month: "Apr",
//     visitors: 150,
//     uniqueVisitors: 90,
//     engagementRate: 68,
//     avgSessionDuration: 185,
//   },
//   {
//     month: "May",
//     visitors: 170,
//     uniqueVisitors: 110,
//     engagementRate: 72,
//     avgSessionDuration: 195,
//   },
//   {
//     month: "Jun",
//     visitors: 180,
//     uniqueVisitors: 120,
//     engagementRate: 78,
//     avgSessionDuration: 210,
//   },
// ];

// const donutData = [
//   { name: "Returning", value: 725 },
//   { name: "New", value: 400 },
// ];

// const scatterData = monthlyData.map((item) => ({
//   x: item.visitors,
//   y: item.engagementRate,
//   size: item.avgSessionDuration,
//   category: item.month,
// }));

const radarData = [
  { subject: "Traffic", A: 120, B: 110, fullMark: 150 },
  { subject: "Conversion", A: 98, B: 130, fullMark: 150 },
  { subject: "Engagement", A: 86, B: 130, fullMark: 150 },
  { subject: "Retention", A: 99, B: 100, fullMark: 150 },
  { subject: "SEO", A: 85, B: 90, fullMark: 150 },
  { subject: "Social", A: 65, B: 85, fullMark: 150 },
];

const colorScheme = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
};

const ChartCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <Card className="overflow-hidden transition-all hover:shadow-lg">
    <CardHeader className="pb-2 bg-card">
      <CardTitle className="text-lg font-semibold text-primary">
        {title}
      </CardTitle>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </CardHeader>
    <CardContent className="pt-6">{children}</CardContent>
  </Card>
);

export default function AnalyticsDashboard() {
  return (
    <div className="">
      {/* <ChartCard title="Area Chart - Stacked" subtitle="Visitors Overview">
        <AreaChart
          className="h-[200px] mt-4"
          data={monthlyData}
          index="month"
          categories={["visitors", "uniqueVisitors"]}
          colors={[colorScheme.chart1, colorScheme.chart2]}
          yAxisWidth={40}
          showAnimation
          showLegend
          showTooltip
          showXAxis
          showYAxis
        />
      </ChartCard> */}

      {/* <ChartCard title="Bar Chart - Multiple" subtitle="Monthly Comparison">
        <BarChart
          className="h-[200px] mt-4"
          data={monthlyData}
          index="month"
          categories={["visitors", "uniqueVisitors"]}
          colors={[colorScheme.chart3, colorScheme.chart4]}
          yAxisWidth={40}
          showAnimation
          showLegend
          showTooltip
          showXAxis
          showYAxis
        />
      </ChartCard> */}

      {/* <ChartCard title="Pie Chart - Donut" subtitle="Visitor Breakdown">
        <div className="relative">
          <DonutChart
            className="h-[200px] mt-4"
            data={donutData}
            category="value"
            index="name"
            colors={[colorScheme.chart2, colorScheme.chart3]}
            showAnimation
            showTooltip
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p
                className="text-3xl font-bold"
                style={{ color: colorScheme.chart1 }}
              >
                1,125
              </p>
              <p className="text-sm text-muted-foreground">Total Visitors</p>
            </div>
          </div>
        </div>
      </ChartCard> */}

      {/* <ChartCard title="Line Chart - Multi Series" subtitle="Key Metrics Trend">
        <LineChart
          className="h-[200px] mt-4"
          data={monthlyData}
          index="month"
          categories={["visitors", "uniqueVisitors", "engagementRate"]}
          colors={[colorScheme.chart1, colorScheme.chart2, colorScheme.chart3]}
          yAxisWidth={40}
          showAnimation
          showLegend
          showTooltip
          showXAxis
          showYAxis
        />
      </ChartCard> */}

      {/* <ChartCard title="Scatter Plot" subtitle="Visitors vs Engagement">
        <ScatterChart
          className="h-[200px] mt-4"
          data={scatterData}
          category="category"
          x="x"
          y="y"
          size="size"
          colors={[colorScheme.chart4]}
          showAnimation
          showLegend
          showTooltip
          showXAxis
          showYAxis
        />
      </ChartCard> */}

      <ChartCard
        title="Radar Chart - Performance Metrics"
        subtitle="Current vs Previous Period"
      >
        <div className="h-[200px] mt-4">
          <RechartsRadarChart
            outerRadius={90}
            width={250}
            height={200}
            data={radarData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Current"
              dataKey="A"
              stroke={colorScheme.chart5}
              fill={colorScheme.chart5}
              fillOpacity={0.6}
            />
            <Radar
              name="Previous"
              dataKey="B"
              stroke={colorScheme.chart3}
              fill={colorScheme.chart3}
              fillOpacity={0.6}
            />
            <Legend />
          </RechartsRadarChart>
        </div>
      </ChartCard>
     
    </div>
  );
}
