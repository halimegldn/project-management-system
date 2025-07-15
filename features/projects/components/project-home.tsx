import { Projects, Teams } from "@/lib/generated/prisma";
import { ProjectCreatePage } from "./project-create";

export function ProjectHome({ projects, teams }: { projects: Projects[]; teams: Teams[] }) {
    return (

        <div className="flex flex-col">
            <ProjectCreatePage teams={teams} />
            {
                projects.map((project) => (
                    <div key={project.id} className="flex flex-col">
                        <p>{project.name}</p>
                        <p>{project.status}</p>
                        <p>{project.time.toLocaleString()}</p>
                    </div>
                ))
            }
        </div>
    )
}