"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { TaskCreateAction } from "../actions";
import { Projects } from "@/lib/generated/prisma";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TasksCreate({ projects }: { projects: Projects[] }) {

    const [state, formAction] = useActionState(TaskCreateAction, null);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
        if (state?.success) {
            setSelectedProjectId("");
            setTaskName("");
        }
    }, [state]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-1/12 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <PlusIcon className="w-4 h-4" />
                    Task Ekle
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Yeni Task Ekle</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="flex flex-col gap-4 mt-4">
                    <Select onValueChange={setSelectedProjectId}>
                        <SelectTrigger className="w-[180px]">
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
                    <input type="hidden" name="projectsId" value={selectedProjectId}></input>
                    <input
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        name="name"
                        placeholder="Task adı"
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
    )
}