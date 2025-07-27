import { ProjectHome } from "@/features/projects/components/project-home";
import { getProjects, getProjectsById } from "@/features/projects/data";
import { getTeams } from "@/features/teams/data";

export default async function Projects({ id }: { id: string }) {
    const projects = await getProjects();
    const teams = await getTeams();

    return (
        <ProjectHome projects={projects} teams={teams} />
    )
}