"use client"
import { Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import { TasksCreate } from "./tasks-create";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TaskUpdateAction } from "../actions";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import type { Projects, Tasks } from "@/lib/generated/prisma"
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function TasksHome({ projects, tasks, userRole, }: { projects: Projects[]; tasks: (Tasks & { projects: Projects })[]; userRole: string }) {

    const router = useRouter();

    const [state, formAction] = useActionState(TaskUpdateAction, null);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [taskName, setTaskName] = useState<string>("");

    useEffect(() => {
        if (state?.success) {
            setEditingTaskId(null)
            router.refresh();
        }
    }, [state, router])

    return (
        <div className="flex flex-col gap-6 p-6">
            {userRole === "admin" && <TasksCreate projects={projects} />}

            {tasks.length === 0 ? (
                <div className="text-center py-12">
                    <Workflow className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz görev yok</h3>
                    <p className="text-gray-600">
                        {userRole === "admin"
                            ? "Henüz hiç görev oluşturulmamış."
                            : "Henüz hiçbir projeye ait görev bulunmuyor."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => {
                        const isEditing = editingTaskId === task.id;
                        return (
                            <Card key={task.id} className="shadow-lg hover:shadow-xl transition rounded-2xl">
                                {isEditing ? (
                                    <form action={formAction} className="flex flex-col gap-4 p-4">

                                        <Input type="hidden" name="id" value={task.id} />
                                        <Input type="hidden" name="projectsId" value={task.projectsId} />

                                        <div className="flex flex-col gap-1">
                                            <Label>Proje</Label>
                                            <Input
                                                value={task.projects?.name ?? "Proje bulunamadı"}
                                                readOnly
                                                className="bg-gray-100 cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <Label>Task Adı</Label>
                                            <Input
                                                name="name"
                                                value={taskName || task.name}
                                                onChange={(e) => setTaskName(e.target.value)}
                                                placeholder="Task Adı"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                                Kaydet
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="bg-gray-200 hover:bg-gray-300"
                                                onClick={() => setEditingTaskId(null)}
                                            >
                                                İptal
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <CardContent className="p-4">
                                        <div className="text-sm text-gray-500 mb-2">{task.projects?.name ?? "Proje bulunamadı"}</div>
                                        <div className="text-lg font-medium text-blue-700">{task.name}</div>
                                        {userRole === "admin" && (
                                            <div className="mt-2 pt-2 border-t">
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    Admin Görünümü
                                                </span>
                                            </div>
                                        )}
                                    </CardContent>
                                )}

                                {!isEditing && userRole === "admin" && (
                                    <CardFooter className="flex justify-end border-t p-4">
                                        <Button onClick={() => setEditingTaskId(task.id)} size="sm">
                                            Düzenle
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
