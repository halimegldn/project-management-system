"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProjectsSchema } from "@/lib/schemas";

export async function ProjectCreate(prevState: any, formData: FormData) {

    const validationFields = ProjectsSchema.safeParse({
        name: formData.get("name")?.toString() || "",
        time: formData.get("time") ? new Date(formData.get("time")!.toString()) : undefined,
        status: formData.get("status")?.toString() || "",
        teams: formData.getAll("teams").map((t) => t.toString()), // tüm takımları çek
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen tüm alanları doğru doldurun",
        };
    }

    const { name, time, status, teams } = validationFields.data;

    const createdProject = await prisma.projects.create({
        data: {
            name,
            time,
            status,
            teams: {
                connect: teams.map(id => ({ id }))
            }
        },
        include: { teams: true },
    });

    return createdProject;
}

export async function ProjectUpdate(prevState: any, formData: FormData) {
    const projectId = formData.get("projectId")?.toString();

    const teams = formData.getAll("teams").map(team => team.toString());

    const validationFields = ProjectsSchema.safeParse({
        name: formData.get("name")?.toString() || "",
        time: formData.get("time") ? new Date(formData.get("time")!.toString()) : undefined,
        status: formData.get("status")?.toString() || "",
        teams: teams,
    });

    if (!validationFields.success) {
        console.error("Validation errors:", validationFields.error);
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen tüm alanları doğru doldurun."
        };
    }


    const { name, time, status } = validationFields.data;

    try {
        const updatedProject = await prisma.projects.update({
            where: { id: projectId },
            data: {
                name,
                time,
                status,
                ...(teams.length > 0 ? { teams: { set: teams.map(id => ({ id })) } } : {})
            },
            include: { teams: true }
        });

        revalidatePath("/projects")
        return { success: true, message: "Proje başarıyla güncellendi.", project: updatedProject }
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database error");
    }
}

export async function ProjectDelete(projectId: string) {
    if (!projectId) {
        return {
            success: false,
            message: "Proje id'si bulunamadı.",
        };
    }

    try {
        await prisma.projects.delete({
            where: { id: projectId },
        });

        revalidatePath("/projects");

        return {
            success: true,
            message: "Proje silindi.",
        };
    } catch (error) {
        console.log("Proje silinemedi.", error);
        return {
            success: false,
            message: "Proje silinirken hata oluştu.",
        };
    }
}

