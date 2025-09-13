"use client";

import { useActionState, useEffect, useState } from "react";
import {
    Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { TeamCreateAction } from "../actions";
import { User } from "@/lib/generated/prisma";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CreateTeam({ users }: { users: User[] }) {
    const [state, formAction] = useActionState(TeamCreateAction, null);
    const [selectedUserId, setSelectedUserId] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setSelectedUserId([]);
            setOpen(false);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <Input type="text" name="teamName" placeholder="Takım Adı" required />

                    {users.map((user) => (
                        <Label key={user.id} className="inline-flex items-center gap-2">
                            <Input
                                type="checkbox"
                                name="userId" // server: formData.getAll("userId")
                                value={user.id}
                                checked={selectedUserId.includes(user.id)}
                                onChange={(e) => {
                                    if (e.target.checked) setSelectedUserId((p) => [...p, user.id]);
                                    else setSelectedUserId((p) => p.filter((id) => id !== user.id));
                                }}
                            />
                            {user.name}
                        </Label>
                    ))}

                    <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 transition">
                        Kaydet
                    </Button>

                    {state?.message && (
                        <p className={`mt-2 ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
