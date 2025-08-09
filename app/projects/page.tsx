import { ProjectHome } from "@/features/projects/components/project-home"
import { getProjects, getUserProjects } from "@/features/projects/data"
import { getCurrentUser, getUser } from "@/features/shared/data"
import { getTeams } from "@/features/teams/data"
import { getServerSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Projects() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/signIn")
    }

    // Role'e göre farklı fonksiyonları çağır
    const projects = user.role === "admin" ? await getProjects() : await getUserProjects(user.id)

    const teams = await getTeams()

    return <ProjectHome projects={projects} teams={teams} userRole={user.role} userId={user.id} />
}
