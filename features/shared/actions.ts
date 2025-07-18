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
            message: "User rol alınırken hata oldu."
        }
    }

    const { role } = validationFields.data;

    try {
        await prisma.user.update({
            where: { id },
            data: { role },
        });

        return {
            success: true,
            message: "Rol başarıyla güncellendi",
        };
    } catch (error) {
        return {
            success: false,
            message: "Rol güncellenirken hata oluştu",
        };
    }

}
