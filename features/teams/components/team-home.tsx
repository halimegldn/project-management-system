"use client";

import { Teams, User } from "@/lib/generated/prisma";
import { CreateTeam } from "./create-team";
import { UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function TeamsHome({ teams, users, userRole, userId }: { teams: (Teams & { users: User[] })[]; users: User[]; userRole: string; userId: string; }) {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Takımlar</h2>

                <CreateTeam users={users} teams={teams} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (

                    <Dialog key={team.id}>
                        <DialogTrigger className="text-sm text-blue-500 underline">
                            <div
                                key={team.id}
                                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                            >

                                <div className="flex items-center justify-start gap-10 text-blue-600">
                                    <UserIcon className="w-5 h-5" />
                                    <p className="font-medium text-lg">
                                        {team.teamName}
                                    </p>
                                </div>
                            </div>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{team.teamName} Üyeleri</DialogTitle>
                                <div>
                                    {
                                        team.users && team.users.length > 0 ? (
                                            team.users.map((user) => (
                                                <DialogDescription key={user.id}>{user.name}</DialogDescription>
                                            ))
                                        ) : (
                                            <DialogDescription>Bu takımda üye yok</DialogDescription>
                                        )
                                    }
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}
