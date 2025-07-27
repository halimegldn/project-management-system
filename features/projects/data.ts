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