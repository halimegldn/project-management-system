import { Projects, Teams } from "@/lib/generated/prisma";
import { ProjectCreatePage } from "./project-create";
import { CalendarDays, Info, Workflow } from "lucide-react";

export function ProjectHome({ projects, teams }: { projects: Projects[]; teams: Teams[] }) {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Projeler</h2>
                <ProjectCreatePage teams={teams} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Workflow className="w-4 h-4 text-blue-600" />
                            {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Durum: {project.status}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(project.time).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
