"use client"
import type { Projects, Tasks } from "@/lib/generated/prisma"
import { TasksCreate } from "./tasks-create"
import { Workflow } from "lucide-react" // Import Workflow icon

export function TasksHome({
    projects,
    tasks,
    userRole,
}: {
    projects: Projects[]; tasks: (Tasks & { projects: Projects })[]
    ; userRole: string
}) {
    return (
        <div className="flex flex-col gap-6 p-6">
            <TasksCreate projects={projects} />
            {tasks.length === 0 ? (
                <div className="text-center py-12">
                    <Workflow className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz görev yok</h3>
                    <p className="text-gray-600">
                        {userRole === "admin" ? "Henüz hiç görev oluşturulmamış." : "Henüz hiçbir projeye ait görev bulunmuyor."}
                    </p>
                </div>
            ) : (
                <div className="w-full grid gap-4">
                    {tasks.map((task) => {
                        return (
                            <div key={task.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
                                <div className="text-sm text-gray-500 mb-1">
                                    {task.projects?.name ?? "Proje bulunamadı"}
                                </div>
                                <div className="flex items-center gap-2 text-blue-600">
                                    <p className="font-medium text-lg">{task.name}</p>
                                </div>
                                {userRole === "admin" && (
                                    <div className="mt-2 pt-2 border-t">
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin Görünümü</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
