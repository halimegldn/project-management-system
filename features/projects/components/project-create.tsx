"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { ProjectCreate } from "../actions";
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Teams } from "@/lib/generated/prisma";

export function ProjectCreatePage({ teams }: { teams: Teams[] }) {

    const [state, formAction] = useActionState(ProjectCreate, null)
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Dialog>
            <DialogTrigger><PlusIcon /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni Takım Ekle</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="flex flex-col gap-4">
                    <input name="name" placeholder="Proje adı" />
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-lg border"
                    />
                    <input type="hidden" name="time" value={date?.toString()}></input>
                    <div className="flex flex-col gp-2">
                        <label>Takımlar</label>
                        {
                            teams.map((team) => (
                                <div className="flex flex-col" key={team.id}>
                                    <label>Takım</label>
                                    <input name="teams" type="checkbox" value={team.id}></input>
                                    <span>{team.name} {team.surname}</span>
                                </div>
                            ))
                        }
                    </div>
                    <input name="status" placeholder="Proje durumu" />
                    <button type="submit">Kaydet</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}