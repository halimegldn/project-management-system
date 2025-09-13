"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { TaskCreateAction } from "../actions";
import { Projects } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function TasksCreate({ projects }: { projects: Projects[] }) {
    const router = useRouter();
    const [state, formAction] = useActionState(TaskCreateAction, null);
    const [open, setOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
        if (state?.success) {
            setSelectedProjectId("");
            setTaskName("");
            setOpen(false);
            router.refresh();
        }
    }, [state, router]);

    const canSubmit = selectedProjectId && taskName;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-36">
                    <PlusIcon className="w-4 h-4" />
                    Task Ekle
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Yeni Task Ekle</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="flex flex-col gap-4 mt-4">
                    <label className="font-medium text-sm">Proje Seçimi</label>
                    <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Proje Adı" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects.map((project) => (
                                <SelectItem value={project.id} key={project.id}>
                                    {project.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* ÖNEMLİ: name 'projectId' olmalı */}
                    <input type="hidden" name="projectId" value={selectedProjectId} />

                    <label className="font-medium text-sm">Task Adı</label>
                    <input
                        name="name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Task adı"
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                        disabled={!canSubmit}
                    >
                        Kaydet
                    </button>

                    {/* İstersen geri bildirim göster */}
                    {state?.success === false && (
                        <p className="text-red-600 text-sm mt-2">{state.message || "Hata oluştu"}</p>
                    )}
                    {state?.success === true && (
                        <p className="text-green-600 text-sm mt-2">{state.message}</p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
