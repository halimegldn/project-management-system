"use client"

import type { Projects, Teams } from "@/lib/generated/prisma"
import { ProjectCreatePage } from "./project-create"
import { CalendarDays, Info, Workflow } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useActionState, useState, useEffect } from "react" // useEffect'i import et
import { ProjectUpdate } from "@/features/projects/actions" // Doğru import yolu
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

export function ProjectHome({
    projects,
    teams,
    userRole,
    userId,
}: { projects: Projects[]; teams: Teams[]; userRole: string; userId: string }) {
    const [state, formAction] = useActionState(ProjectUpdate, null)
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
    const [currentProjectName, setCurrentProjectName] = useState<string>("")
    const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("")
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);

    useEffect(() => {
        if (editingProjectId) {
            const projectToEdit = projects.find((p) => p.id === editingProjectId)
            if (projectToEdit) {
                setCurrentProjectName(projectToEdit.name)
                setCurrentProjectStatus(projectToEdit.status)
            }
        } else {
            setCurrentProjectName("")
            setCurrentProjectStatus("")
        }
    }, [editingProjectId, projects])

    useEffect(() => {
        if (state?.success) {
            console.log(state.message)
            setEditingProjectId(null) // Başarılı olursa düzenleme modundan çık
            // İsteğe bağlı: Bir toast bildirimi göster
        } else if (state?.error) {
            console.error(state.message, state.error)
            // İsteğe bağlı: Hata mesajlarını inputların yanında göster veya bir hata toast'ı göster
        }
    }, [state])

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
                {userRole === "admin" && <ProjectCreatePage teams={teams} />}
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
                    {projects.map((project) => {
                        const isEditing = editingProjectId === project.id
                        return isEditing ? (
                            <form
                                key={project.id}
                                action={formAction}
                                className="border rounded-xl p-6 shadow-md bg-white flex flex-col gap-4"
                            >
                                <input type="hidden" name="projectId" value={project.id} />

                                <Label htmlFor={`name-${project.id}`}>Proje Adı</Label>
                                <Input
                                    id={`name-${project.id}`}
                                    name="name"
                                    value={currentProjectName}
                                    onChange={(e) => setCurrentProjectName(e.target.value)}
                                    className="mb-2"
                                />

                                <Label htmlFor={`status-${project.id}`}>Durum</Label>
                                <Input
                                    id={`status-${project.id}`}
                                    name="status"
                                    value={currentProjectStatus}
                                    onChange={(e) => setCurrentProjectStatus(e.target.value)}
                                    className="mb-2"
                                />

                                <Label htmlFor={`teams-${project.id}`}>Takımlar</Label>
                                <div className="flex flex-col max-h-48 overflow-y-auto border rounded p-2 gap-1">
                                    {teams.map((team) => (
                                        <Label key={team.id} className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="teams"
                                                value={team.id}
                                                checked={selectedTeamIds.includes(team.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedTeamIds((prev) => [...prev, team.id]);
                                                    } else {
                                                        setSelectedTeamIds((prev) => prev.filter((id) => id !== team.id));
                                                    }
                                                }}
                                                className="form-checkbox"
                                            />
                                            {team.teamName}
                                        </Label>
                                    ))}
                                </div>


                                <Label htmlFor={`time-${project.id}`}>Tarih</Label>
                                <Input
                                    id={`time-${project.id}`}
                                    type="date"
                                    name="time"
                                    defaultValue={new Date(project.time).toISOString().split("T")[0]}
                                    className="mb-4"
                                />

                                <div className="flex gap-3 justify-end">
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition">
                                        Kaydet
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setEditingProjectId(null)}
                                        className="bg-gray-200 hover:bg-gray-300 transition"
                                    >
                                        İptal
                                    </Button>
                                </div>
                            </form>

                        ) : (

                            <div
                                key={project.id}
                                className="border rounded-xl p-6 shadow hover:shadow-lg transition bg-white flex flex-col gap-4"
                            >
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <Workflow className="w-5 h-5 text-blue-600" />
                                    {project.name}
                                </h3>

                                <div className="flex flex-wrap gap-6 text-gray-600">
                                    <p className="flex items-center gap-1 text-sm">
                                        <Info className="w-4 h-4" />
                                        Durum: <span className="font-medium ml-1">{project.status}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4" />
                                        {new Date(project.time).toISOString().split("T")[0]}
                                    </p>
                                </div>

                                {userRole === "admin" && (
                                    <div className="mt-auto pt-4 border-t flex justify-between items-center">
                                        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            Admin Görünümü
                                        </span>
                                        <Button onClick={() => setEditingProjectId(project.id)} size="sm">
                                            Düzenle
                                        </Button>
                                    </div>
                                )}
                            </div>

                        )
                    })}
                </div>
            )}
        </div>
    )
}
