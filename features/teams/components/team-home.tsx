"use client";

import { Teams } from "@/lib/generated/prisma";
import { CreateTeam } from "./create-team";

export function TeamsHome({ teams }: { teams: Teams[] }) {
    return (
        <div className="flex flex-col">
            <CreateTeam />
            {
                teams.map((team) => (
                    <p key={team.id}>{team.name} {team.surname}</p>
                ))
            }
        </div>
    )
}