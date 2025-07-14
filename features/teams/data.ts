import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";


export async function getTeams() {
    noStore();

    try {
        const teams = await prisma.teams.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return teams
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Takım verileri alınırken hata oluştu");
    }
}