import type { Projects, Teams, Tasks } from "@/lib/generated/prisma"
import { ProjectCreatePage } from "./project-create"
import { CalendarDays, Info, Workflow, Users } from "lucide-react"

// type ProjectWithRelations = Projects & {
//     teams: Teams[]
//     tasks: Tasks[]
// }

export function ProjectHome({
    projects,
    teams,
    userRole,
    userId,
}: {
    projects: Projects[];
    teams: Teams[]
    userRole: string
    userId: string
}) {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">Projeler</h2>
                    <p className="text-sm text-gray-600">
                        {userRole === "admin"
                            ? `Toplam ${projects.length} proje (Tüm projeler)`
                            : `${projects.length} projeniz var`}
                    </p>
                </div>
                <ProjectCreatePage teams={teams} />
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-12">
                    <Workflow className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz proje yok</h3>
                    <p className="text-gray-600">
                        {userRole === "admin" ? "Henüz hiç proje oluşturulmamış." : "Henüz hiçbir projeye dahil değilsiniz."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
                            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                <Workflow className="w-4 h-4 text-blue-600" />
                                {project.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Durum: {project.status}
                            </p>

                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                {new Date(project.time).toLocaleDateString()}
                            </p>

                            {/* <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{project.teams.length} üye</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    <span>{project.tasks.length} görev</span>
                                </div>
                            </div> */}

                            {userRole === "admin" && (
                                <div className="mt-2 pt-2 border-t">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin Görünümü</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
