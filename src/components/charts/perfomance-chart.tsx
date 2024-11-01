import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PerformanceMetrics = () => {
  const data = [
    { name: "Q1", projects: 40, bugs: 24, target: 30 },
    { name: "Q2", projects: 30, bugs: 14, target: 28 },
    { name: "Q3", projects: 20, bugs: 18, target: 24 },
    { name: "Q4", projects: 28, bugs: 9, target: 26 },
  ];

  // Get CSS variables for colors
  const rootStyle = getComputedStyle(document.documentElement);
  const colorProjects = rootStyle.getPropertyValue("--primary").trim();
  const colorBugs = rootStyle.getPropertyValue("--secondary").trim();
  const colorTarget = rootStyle.getPropertyValue("--accent").trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Quarterly performance metrics including projects, bugs, and targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              height={300}
              width={350}
            >
              <defs>
                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={colorProjects}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colorProjects}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorBugs} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colorBugs} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorTarget} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colorTarget} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="projects"
                stroke={colorProjects}
                fillOpacity={1}
                fill="url(#colorProjects)"
              />
              <Area
                type="monotone"
                dataKey="bugs"
                stroke={colorBugs}
                fillOpacity={1}
                fill="url(#colorBugs)"
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke={colorTarget}
                fillOpacity={1}
                fill="url(#colorTarget)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
