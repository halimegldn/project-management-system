"use client";

import { useActionState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { TeamCreateAction } from "../actions";

export function CreateTeam() {
    const [state, formAction] = useActionState(TeamCreateAction, null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button><PlusIcon /></button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni Takım Ekle</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="flex flex-col gap-4">
                    <input name="name" placeholder="Personel adı" />
                    <input name="surname" placeholder="Personel soyadı" />
                    <button type="submit">Kaydet</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
