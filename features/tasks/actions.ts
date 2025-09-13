"use server";

import { prisma } from "@/lib/prisma";
import { TasksSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

export async function TaskCreateAction(prevState: any, formData: FormData) {
    const validationFields = TasksSchema.safeParse({
        name: formData.get("name"),
        projectId: formData.get("projectId"),
    });

    if (!validationFields.success) {
        return {
            success: false,
            error: validationFields.error.flatten().fieldErrors,
            message: "Task girin",
        };
    }

    const { name, projectId } = validationFields.data;

    await prisma.tasks.create({
        data: {
            name,
            projectId
        },
    });

    return { success: true, message: "Task başarıyla eklendi" };
}

export async function TaskUpdateAction(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;

    const validationFields = TasksSchema.safeParse({
        name: formData.get("name"),
        projectId: formData.get("projectId"),
    });

    if (!validationFields.success) {
        return {
            success: false,
            error: validationFields.error.flatten().fieldErrors,
            message: "Task bilgileri eksik, güncellenemedi.",
        };
    }

    const { name, projectId } = validationFields.data;

    try {
        await prisma.tasks.update({
            where: { id },
            data: { name, projectId },
        });

        return {
            success: true,
            message: "Task başarıyla güncellendi."
        };
    } catch (err) {
        console.error("Task update error:", err);
        return {
            success: false,
            message: "Task güncellenirken hata oluştu.",
        };
    }
}

export async function TaskDeleteAction(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;

    if (!id) {
        return { success: false, message: "Geçersiz task id." };
    }

    try {
        await prisma.tasks.delete({
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
