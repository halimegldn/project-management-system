"use server";

import { prisma } from "@/lib/prisma";
import { UserSchema } from "@/lib/schemas";

export async function UserUpdate(prevState: any, formData: FormData) {

    const id = formData.get("id") as string;

    const validationFields = UserSchema.safeParse({
        role: formData.get("role"),
    })

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "User rol alnırken hata oldu."
        }
    }

    const { role } = validationFields.data;

    try {
        const updateRole = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                role,
            }
        })
    } catch (error) {
        return {
            success: true,
            message: "Rol başarıyla güncellendis",
        };
    }
}