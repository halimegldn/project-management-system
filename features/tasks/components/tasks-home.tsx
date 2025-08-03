"use client";

import { Projects, Tasks } from "@/lib/generated/prisma";
import { TasksCreate } from "./tasks-create";

export function TasksHome({ projects, tasks }: { projects: Projects[]; tasks: Tasks[] }) {
    return (
        <div className="flex flex-col gap-6 p-6">
            <TasksCreate projects={projects} />

            <div className="w-full grid gap-4">
                {tasks.map((task) => {
                    // const taskProject = projects.find((project) => project.id === task.projectsId);
                    return (
                        <div
                            key={task.id}
                            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                        >
                            <div className="text-sm text-gray-500 mb-1">
                                {task?.name ?? "Proje bulunamadı"}
                            </div>

                            <div className="flex items-center gap-2 text-blue-600">
                                <p className="font-medium text-lg">{task.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
