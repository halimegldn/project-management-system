"use client";

import { Teams } from "@/lib/generated/prisma";
import { CreateTeam } from "./create-team";
import { User } from "lucide-react";

export function TeamsHome({ teams }: { teams: Teams[] }) {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Takımlar</h2>
                <CreateTeam />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                    >
                        <div className="flex items-center gap-2 text-blue-600">
                            <User className="w-5 h-5" />
                            <p className="font-medium text-lg">
                                {team.name} {team.surname}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
