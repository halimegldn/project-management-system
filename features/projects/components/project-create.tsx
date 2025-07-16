"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useActionState, useState } from "react";
import { PlusIcon } from "lucide-react";
import { ProjectCreate } from "../actions";
import { Teams } from "@/lib/generated/prisma";

export function ProjectCreatePage({ teams }: { teams: Teams[] }) {

    const [state, formAction] = useActionState(ProjectCreate, null);
    const [projectName, setProjectName] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [projectStatu, setProjectStatu] = useState("");

    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                <PlusIcon className="w-4 h-4" />
                Proje Ekle
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Yeni Proje Oluştur</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="flex flex-col gap-4">
                    <input
                        name="name"
                        placeholder="Proje adı"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />

                    <div>
                        <label className="text-sm font-medium mb-1 block">Proje Tarihi</label>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                        <input type="hidden" name="time" value={date?.toISOString()} />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Takım Seçimi</label>
                        <div className="grid grid-cols-2 gap-2">
                            {teams.map((team) => (
                                <label key={team.id} className="flex items-center gap-2">
                                    <input type="checkbox" name="teams" value={team.id} />
                                    <span className="text-sm">{team.name} {team.surname}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <input
                        name="status"
                        placeholder="Proje durumu"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={projectStatu}
                        onChange={(e) => setProjectStatu(e.target.value)}
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
