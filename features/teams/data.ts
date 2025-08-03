import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getTeams() {
    noStore();

    try {
        const teams = await prisma.teams.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                users: true,
            }
        })
        return teams
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Takım verileri alınırken hata oluştu");
    }
}

export async function getUserTeams(userId: string) {
    noStore()
    try {
        const teams = await prisma.teams.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                users: true,  // teams modeli içinde tasks var mı, kontrol et
            },
        })
        return teams  // burada da hata var, 'teams' dönmeli
    } catch (error) {
        console.error("Error fetching user projects", error)
        throw new Error("Kullanıcı projeleri alınırken hata oluştu")
    }
}
