import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentProjects = [
  { name: "E-commerce Platform", client: "TechGear", status: "In Progress" },
  {
    name: "Corporate Website Redesign",
    client: "MegaCorp",
    status: "Completed",
  },
  { name: "Blog Migration", client: "FoodieFinds", status: "In Review" },
  { name: "Portfolio Showcase", client: "ArtistX", status: "Planning" },
];

export function RecentProjectsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>
          Overview of the latest project activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-medium">
                  Project Name
                </th>
                <th className="px-4 py-2 text-left font-medium">Client</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{project.name}</td>
                  <td className="px-4 py-2">{project.client}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "In Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
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
