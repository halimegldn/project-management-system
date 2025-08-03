import { getCurrentUser, getUser } from "@/features/shared/data";
import { TeamsHome } from "@/features/teams/components/team-home";
import { getTeams, getUserTeams } from "@/features/teams/data";
import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function TeamPage() {
    const user = await getCurrentUser()
    const users = await getUser()


    if (!user) {
        redirect("/signIn")
    }

    // Role'e göre farklı fonksiyonları çağır
    const teams = user.role === "admin" ? await getTeams() : await getUserTeams(user.id)
    return (
        <TeamsHome teams={teams} userRole={user.role} userId={user.id} users={users} />
    )
}