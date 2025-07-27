import { ProjectHome } from "@/features/projects/components/project-home"
import { getProjects, getUserProjects } from "@/features/projects/data"
import { getTeams } from "@/features/teams/data"
import { getServerSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Projects() {
    const session = await getServerSession()

    if (!session?.user) {
        redirect("/signIn")
    }

    const userId = session.user.id
    const userRole = session.user.role ?? "user"

    // Role'e göre farklı fonksiyonları çağır
    const projects = userRole === "admin" ? await getProjects() : await getUserProjects(userId)

    const teams = await getTeams()

    return <ProjectHome projects={projects} teams={teams} userRole={userRole} userId={userId} />
}
