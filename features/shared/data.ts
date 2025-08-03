import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/session";
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

export async function getUserById(id: string) {
    noStore()
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                teams: true,
                sessions: true,
                accounts: true,
            },
        })
        return user
    } catch (error) {
        console.error("Error fetching user by id", error)
        throw new Error("User verisi alınırken hata oldu.")
    }
}

export async function getCurrentUser() {
    noStore();

    const session = await getServerSession();

    if (!session?.user?.id) {
        return null;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                teams: true,
                sessions: true,
                accounts: true,
            },
        });

        return user;
    } catch (error) {
        console.error("getCurrentUser error:", error);
        return null;
    }
}