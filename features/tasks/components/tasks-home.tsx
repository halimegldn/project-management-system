import { Projects, Tasks } from "@/lib/generated/prisma";
import { TasksCreate } from "./tasks-create";

export function TasksHome({ projects, tasks }: { projects: Projects[], tasks: Tasks[] }) {
    return (
        <div className="flex flex-col">
            <TasksCreate projects={projects} />
            <div className="w-full">
                {tasks.map((task) => {
                    const taskProject = projects.find((project) => project.id === task.projectsId);
                    return (
                        <div
                            key={task.id}
                            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
                        >
                            <div>{taskProject?.name}</div>
                            <div className="flex items-center gap-2 text-blue-600">
                                <p className="font-medium text-lg">
                                    {task.name}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}