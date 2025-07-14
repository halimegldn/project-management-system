"use server";

import { prisma } from "@/lib/prisma";
import { TeamsSchema } from "@/lib/schemas";

export async function TeamCreateAction(prevState: any, formData: FormData) {
    const validationFields = TeamsSchema.safeParse({
        name: formData.get("name"),
        surname: formData.get("surname"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen uygun alan girin",
        };
    }

    const { name, surname } = validationFields.data;

    const createdTeam = await prisma.teams.create({
        data: { name, surname },
    });

    return createdTeam;
}
