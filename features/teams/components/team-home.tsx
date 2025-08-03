"use client";

import { Teams, User } from "@/lib/generated/prisma";
import { CreateTeam } from "./create-team";
import { UserIcon } from "lucide-react";

export function TeamsHome({ teams, users }: { teams: Teams[], users: User[]; }) {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Takımlar</h2>

                <CreateTeam users={users} teams={teams} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                    >
                        <div className="flex items-center gap-2 text-blue-600">
                            <UserIcon className="w-5 h-5" />
                            <p className="font-medium text-lg">
                                {team.teamName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
