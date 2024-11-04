import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectStatus = "Completed" | "In Progress" | "In Review" | "Planning";

interface Project {
  name: string;
  client: string;
  status: ProjectStatus;
}

const recentProjects: Project[] = [
  { name: "E-commerce Platform", client: "TechGear", status: "In Progress" },
  {
    name: "Corporate Website Redesign",
    client: "MegaCorp",
    status: "Completed",
  },
  { name: "Blog Migration", client: "FoodieFinds", status: "In Review" },
  { name: "Portfolio Showcase", client: "ArtistX", status: "Planning" },
];

const statusColorClasses: Record<ProjectStatus, string> = {
  Completed: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
  "In Progress": "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]",
  "In Review": "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]",
  Planning:
    "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
};

export function RecentProjectsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Recent Projects</CardTitle>
        <CardDescription>
          Overview of the latest project activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left font-medium text-foreground">
                  Project Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-foreground">
                  Client
                </th>
                <th className="px-4 py-2 text-left font-medium text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-b-0 hover:bg-[hsl(var(--card))]"
                >
                  <td className="px-4 py-2 text-foreground">{project.name}</td>
                  <td className="px-4 py-2 text-foreground">
                    {project.client}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        statusColorClasses[project.status]
                      } hover:opacity-80`}
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
  );
}
