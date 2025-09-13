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

export async function teamUpdateAction(prevState: any, formData: FormData) {
    const teamId = formData.get("teamId")?.toString();
    const userIds = formData.getAll("userId").filter(id => typeof id === "string") as string[];

    if (!teamId) {
        return {
            success: false,
            message: " Takım bulunamadı."
        }
    }

    const validationFields = TeamsSchema.safeParse({
        teamName: formData.get("teamName"),
    })

    if (!validationFields.success) {
        console.error("Validation errors:", validationFields.error);
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen takımları doğru doldurun."
        };
    }

    const { teamName } = validationFields.data;

    try {
        const updatedTeam = await prisma.teams.update({
            where: {
                id: teamId,
            },
            data: {
                teamName,
                ...(userIds.length > 0
                    ? { users: { set: userIds.map(id => ({ id })) } }
                    : {})
            }

        })
        return {
            success: true,
            message: "Takım güncellendi.",
            data: updatedTeam,
        }
    } catch (error) {
        console.error("Takım oluşturulurken hata:", error);
        return {
            success: false,
            message: "Takım oluşturulurken bir hata oluştu.",
        };
    }
}

export async function TeamDeleteAction(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;

    if (!id) {
        return { success: false, message: "Geçersiz task id." };
    }

    try {
        await prisma.teams.delete({
            where: { id },
        });
        return {
            success: true,
            messagge: "Task başarıyla silindi."
        }
    } catch (error) {
        return {
            success: false,
            messagge: "Task silinirken hata oluştu."
        };
    }
}