"use client";

import { ClientSatisfactionChart } from "./charts/client-satisfaction";
import { ProjectsCompletedChart } from "./charts/projects-completed";
import { ProjectTypesChart } from "./charts/project-types";
import { RecentProjectsTable } from "./charts/recent-projects";
import PerformanceMetrics from "./charts/perfomance-chart";

export default function MockDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProjectsCompletedChart />
        <ClientSatisfactionChart />
        <ProjectTypesChart />
        <PerformanceMetrics />
      </div>
      <div>
        <RecentProjectsTable />
      </div>
    </>
  );
}
