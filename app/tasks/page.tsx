import { getProjects } from "@/features/projects/data";
import { TasksHome } from "@/features/tasks/components/tasks-home";
import { getTasks } from "@/features/tasks/data";

export default async function TasksPage() {

    const projects = await getProjects();
    const tasks = await getTasks();

    return (
        <TasksHome projects={projects} tasks={tasks} />
    )
}