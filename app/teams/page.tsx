import { TeamsHome } from "@/features/teams/components/team-home";
import { getTeams } from "@/features/teams/data";

export default async function TeamPage() {
    const teams = await getTeams();
    return (
        <TeamsHome teams={teams} />
    )
}