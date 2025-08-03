"use server";

import { prisma } from "@/lib/prisma";
import { TeamsSchema } from "@/lib/schemas";

export async function TeamCreateAction(prevState: any, formData: FormData) {
    const userIds = formData.getAll("userId").filter(id => typeof id === "string") as string[];

    if (userIds.length === 0) {
        return {
            success: false,
            message: "Lütfen en az bir kullanıcı seçin.",
        };
    }

    const validation = TeamsSchema.safeParse({
        teamName: formData.get("teamName"),
    });

    if (!validation.success) {
        return {
            success: false,
            message: "Takım adı zorunludur.",
        };
    }

    const { teamName } = validation.data;

    try {
        const createdTeam = await prisma.teams.create({
            data: {
                teamName,
                users: {
                    connect: userIds.map(id => ({ id })),
                },
            },
        });

        return {
            success: true,
            message: "Takım başarıyla oluşturuldu.",
            data: createdTeam,
        };
    } catch (error) {
        console.error("Takım oluşturulurken hata:", error);
        return {
            success: false,
            message: "Takım oluşturulurken bir hata oluştu.",
        };
    }
}
