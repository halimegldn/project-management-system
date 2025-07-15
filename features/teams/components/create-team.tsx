"use client";

import { useActionState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { TeamCreateAction } from "../actions";

export function CreateTeam() {
    const [state, formAction] = useActionState(TeamCreateAction, null);

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
                    <input
                        name="name"
                        placeholder="Personel adı"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="surname"
                        placeholder="Personel soyadı"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
