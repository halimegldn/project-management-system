"use client";

import { useActionState, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { TeamCreateAction } from "../actions";
import { Teams, User } from "@/lib/generated/prisma";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CreateTeam({ users, teams }: { users: User[]; teams: Teams[] }) {
    const [state, formAction] = useActionState(TeamCreateAction, null);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teamSurname, setTeamSurname] = useState("");


    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <PlusIcon className="w-4 h-4" />
                    Takım Ekle
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Yeni Takım Ekle</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="flex flex-col gap-4 mt-4">

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Mevcut personel seçin" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name} {user.surname}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <input
                        name="name"
                        placeholder="Personel adı"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <input
                        name="surname"
                        placeholder="Personel soyadı"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={teamSurname}
                        onChange={(e) => setTeamSurname(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Kaydet
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
