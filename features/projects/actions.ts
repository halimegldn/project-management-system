"use server";

import { prisma } from "@/lib/prisma";
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
                connect: teams.map(id => ({ id })) //takımların içerisinde maple dön
            }
        },
        include: { teams: true },
    });

    return createdProject;
}
