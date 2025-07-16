import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getTasks() {
    noStore();

    try {
        const tasks = await prisma.tasks.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Task verileri alınırken hata oldu");
    }
}