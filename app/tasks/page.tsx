import { getUserProjects } from "@/features/projects/data"
import { getTasks, getUserProjectTasks } from "@/features/tasks/data"
import { TasksHome } from "@/features/tasks/components/tasks-home"
import { getCurrentUser } from "@/features/shared/data"
import { redirect } from "next/navigation"

export default async function TasksPage() {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/signIn")
    }

    // role göre projeleri al
    const projects = user.role === "admin" ? await getUserProjects(user.id) : await getUserProjects(user.id)

    // projelere göre taskları al
    const tasks = user.role === "admin" ? await getTasks() : await getUserProjectTasks(user.id)


    return <TasksHome projects={projects} tasks={tasks} userRole={user.role} />
}
