import { getUserProjects } from "@/features/projects/data";
import { getUserProjectTasks } from "@/features/tasks/data";
import { TasksHome } from "@/features/tasks/components/tasks-home";

export default async function TasksPage({ userId }: { userId: string }) {
    const projects = await getUserProjects(userId);
    const tasks = await getUserProjectTasks(userId);

    console.log("Tasks in TasksPage:", tasks); // Bu log kesin backend konsolunda görünmeli

    return <TasksHome projects={projects} tasks={tasks} />;
}
