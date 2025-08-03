import { getUser } from "@/features/shared/data";
import { TeamsHome } from "@/features/teams/components/team-home";
import { getTeams } from "@/features/teams/data";
import { getServerSession } from "@/lib/session";

export default async function TeamPage() {
    const session = await getServerSession()

    const teams = await getTeams();
    const users = await getUser();
    return (
        <TeamsHome teams={teams} users={users} />
    )
}