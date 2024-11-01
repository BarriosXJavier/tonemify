"use client";

import { ClientSatisfactionChart } from "./client-satisfaction";
import { ProjectsCompletedChart } from "./projects-completed";
import { ProjectTypesChart } from "./project-types";
import { RecentProjectsTable } from "./recent-projects";
import PerformanceMetrics from "./perfomance-chart";

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
