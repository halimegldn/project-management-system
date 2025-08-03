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

export async function getUserProjectTasks(userId: string) {
    try {
        const projects = await prisma.projects.findMany({
            where: {
                teams: {
                    some: {
                        users: {
                            some: { id: userId },
                        },
                    },
                },
            },
            select: { id: true, name: true }, // ismi de alırsan daha anlaşılır olur
        });

        console.log("User's projects:", projects);

        const projectIds = projects.map(p => p.id);

        if (projectIds.length === 0) {
            console.log("No projects found for user", userId);
            return [];
        }

        const tasks = await prisma.tasks.findMany({
            where: {
                projectsId: { in: projectIds },
            },
            orderBy: { createdAt: "desc" },
            include: { projects: true },
        });

        console.log("Tasks for user's projects:", tasks);

        return tasks;
    } catch (error) {
        console.error("Error fetching user project tasks", error);
        throw new Error("Kullanıcının projelerine ait görevler alınırken hata oluştu");
    }
}

