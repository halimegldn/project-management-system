import z from "zod";

export const TeamsSchema = z.object({
    name: z.string().min(1, "Personel adı girin"),
    surname: z.string().min(1, "Personel soyadı girin"),
})

export const ProjectsSchema = z.object({
    name: z.string().min(1, "Proje adı girin"),
    teams: z.array(z.string()).min(1, "En az bir takım seçiniz"),
    time: z.date(),
    status: z.string().min(1, "Proje durumu girin")
});

export const TasksSchema = z.object({
    name: z.string().min(1, "Task girin"),
    projectsId: z.string().min(1, "Proje ID'si zorunludur"),
})

export const UserSchema = z.object({
    role: z.string().min(1, "En az 1 rol adı girin")
})