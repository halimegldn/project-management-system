import { ProjectHome } from "@/features/projects/components/project-home";
import { getProjects } from "@/features/projects/data";
import { getTeams } from "@/features/teams/data";

export default async function Projects() {
    const projects = await getProjects();
    const teams = await getTeams();

    return (
        <ProjectHome projects={projects} teams={teams} />
    )
}