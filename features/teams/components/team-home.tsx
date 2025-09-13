"use client";

import { UserIcon } from "lucide-react";
import { CreateTeam } from "./create-team";
import { useRouter } from "next/navigation";
import { teamUpdateAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Teams, User } from "@/lib/generated/prisma";
import { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TeamDeleteAlert } from "./team-delete";

export function TeamsHome({ teams, users, userRole, userId }: { teams: (Teams & { users: User[] })[]; users: User[]; userRole: string; userId: string; }) {
    const router = useRouter();

    const [state, formAction] = useActionState(teamUpdateAction, null);
    const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [currentTeamName, setCurrentTeamName] = useState<string>("");

    const startEditing = (team: Teams & { users: User[] }) => {
        setEditingTeamId(team.id);
        setSelectedUserIds(team.users.map((u) => u.id));
        setCurrentTeamName(team.teamName);
    };


    useEffect(() => {
        if (state?.success) {
            setEditingTeamId(null)
            router.refresh();
        }
    }, [state, router])
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Takımlar</h2>
                {
                    userRole === "admin" && (
                        <CreateTeam users={users} teams={teams} />
                    )
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => {
                    const isEditing = editingTeamId === team.id;

                    return isEditing ? (
                        <form action={formAction} key={team.id} className="border rounded-xl p-4 bg-white shadow-sm">
                            <input type="hidden" name="teamId" value={team.id} />

                            <Label className="block mb-2">Takım Adı</Label>
                            <Input
                                type="text"
                                name="teamName"
                                value={currentTeamName}
                                onChange={(e) => setCurrentTeamName(e.target.value)}
                                className="mb-4"
                            />

                            <Label className="block mb-2">Takım Üyeleri</Label>
                            <div className="flex flex-col gap-2 mb-4">
                                {users.map((user) => (
                                    <Label key={user.id} className="inline-flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="userId"
                                            value={user.id}
                                            checked={selectedUserIds.includes(user.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUserIds((prev) => [...prev, user.id]);
                                                } else {
                                                    setSelectedUserIds((prev) =>
                                                        prev.filter((id) => id !== user.id)
                                                    );
                                                }
                                            }}
                                            className="form-checkbox"
                                        />
                                        {user.name}
                                    </Label>
                                ))}
                            </div>

                            <div className="flex gap-3 justify-end">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition">
                                    Kaydet
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setEditingTeamId(null)}
                                    className="bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    İptal
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <Dialog key={team.id}>
                            <DialogTrigger className="w-full">
                                <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
                                    <div className="flex items-center gap-3 text-blue-600">
                                        <UserIcon className="w-5 h-5" />
                                        <p className="font-medium text-lg">{team.teamName}</p>
                                    </div>
                                </div>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{team.teamName} Üyeleri</DialogTitle>
                                    <div>
                                        {team.users.length > 0 ? (
                                            team.users.map((user) => (
                                                <DialogDescription key={user.id}>{user.name}</DialogDescription>
                                            ))
                                        ) : (
                                            <DialogDescription>Bu takımda üye yok</DialogDescription>
                                        )}
                                    </div>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button onClick={() => startEditing(team)}>Düzenle</Button>
                                    <TeamDeleteAlert teamId={team.id} />
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    );
                })}
            </div>
        </div>
    );
}
