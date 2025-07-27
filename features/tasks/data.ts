import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getTasks() {
    noStore();

    try {
        const tasks = await prisma.tasks.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                projects: true,
            }
        })
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Task verileri alınırken hata oldu");
    }
}

export async function getTaskById(id: string) {
    noStore()
    try {
        const task = await prisma.tasks.findUnique({
            where: { id },
            include: {
                projects: true,
            },
        })
        return task
    } catch (error) {
        console.error("Error fetching task by id", error)
        throw new Error("Görev verisi alınırken hata oluştu")
    }
}

export async function getProjectTasks(projectId: string) {
    noStore()
    try {
        const tasks = await prisma.tasks.findMany({
            where: {
                projectsId: projectId,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                projects: true,
            },
        })
        return tasks
    } catch (error) {
        console.error("Error fetching project tasks", error)
        throw new Error("Proje görevleri alınırken hata oluştu")
    }
}