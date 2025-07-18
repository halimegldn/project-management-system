import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getUser() {
    noStore();

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return users;
    } catch (error) {
        console.log("Error fetching user", error);
        throw new Error("User verileri alınırken hata oldu.");
    }
}