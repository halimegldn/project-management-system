import { getUser } from "@/features/shared/data";
import { TeamsHome } from "@/features/teams/components/team-home";
import { getTeams } from "@/features/teams/data";

export default async function TeamPage() {
    const teams = await getTeams();
    const users = await getUser();
    return (
        <TeamsHome teams={teams} users={users} />
    )
}