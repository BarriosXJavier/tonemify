import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceMetrics = () => {
  const data = [
    { name: "Q1", projects: 40, bugs: 24, target: 30 },
    { name: "Q2", projects: 30, bugs: 14, target: 28 },
    { name: "Q3", projects: 20, bugs: 18, target: 24 },
    { name: "Q4", projects: 28, bugs: 9, target: 26 },
  ];

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="projects"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorProjects)"
          />
          <Area
            type="monotone"
            dataKey="bugs"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorBugs)"
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#colorTarget)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceMetrics;
