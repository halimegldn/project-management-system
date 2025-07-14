import z from "zod";

export const TeamsSchema = z.object({
    name: z.string().min(1, "Personel adı girin"),
    surname: z.string().min(1, "Personel soyadı girin"),
})

export const ProjectsSchema = z.object({
    name: z.string().min(1, "Proje adı girin"),
    teams: z.array(TeamsSchema).min(1, "En az bir takım giriniz"),
    time: z.date(),
    status: z.string().min(1, "Proje durumu girin")
})