import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";


export async function getProjects() {
    noStore();

    try {
        const project = await prisma.projects.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                teams: true,
            },
        })
        return project;
    } catch (error) {
        console.error("Error fetching project", error);
        throw new Error("Proje verileri alınırken hata oluştu")
    }
}


// BURANIN ADINI DAHA SONRA DEĞİŞTİR 


export async function getUserProjects(userId: string) {
    noStore()
    try {
        const projects = await prisma.projects.findMany({
            where: {
                teams: {
                    some: {
                        userId: userId,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                teams: true,
                tasks: true,
            },
        })
        return projects
    } catch (error) {
        console.error("Error fetching user projects", error)
        throw new Error("Kullanıcı projeleri alınırken hata oluştu")
    }
}


export async function getProjectsById(id: string) {
    noStore();

    try {
        const project = await prisma.projects.findUnique({
            where: {
                id: id,
            },
            include: {
                teams: true,
            },
        })
        return project;
    } catch (error) {
        console.error("Error fetching project", error);
        throw new Error("Proje verileri alınırken hata oluştu")
    }
}