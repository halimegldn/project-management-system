"use server";

import { prisma } from "@/lib/prisma";
import { TasksSchema } from "@/lib/schemas";

export async function TaskCreateAction(prevState: any, formData: FormData) {
    const validationFields = TasksSchema.safeParse({
        name: formData.get("name"),
        projectsId: formData.get("projectsId"),
    })

    if (!validationFields.success) {
        return {
            success: false,
            error: validationFields.error.flatten().fieldErrors,
            message: "Task girin"
        }
    }
    const { name, projectsId } = validationFields.data;

    const createTasks = await prisma.tasks.create({
        data: { name, projectsId }
    });

    return {
        success: true,
        message: "Task başarıyla eklendi",
    };
}