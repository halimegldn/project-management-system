"use client"

import type { Projects, Teams } from "@/lib/generated/prisma"
import { ProjectCreatePage } from "./project-create"
import { CalendarDays, Info, Workflow, Edit3, Users, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useActionState, useState, useEffect } from "react"
import { ProjectUpdate } from "@/features/projects/actions" // Fixed import path to match the actual actions file location
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProjectDeleteAlert } from "./project-delete"

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "tamamlandı":
        case "completed":
            return "bg-green-100 text-green-800 border-green-200"
        case "devam ediyor":
        case "in progress":
            return "bg-blue-100 text-blue-800 border-blue-200"
        case "beklemede":
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case "tamamlandı":
        case "completed":
            return <CheckCircle2 className="w-4 h-4" />
        case "devam ediyor":
        case "in progress":
            return <Clock className="w-4 h-4" />
        case "beklemede":
        case "pending":
            return <AlertCircle className="w-4 h-4" />
        default:
            return <Info className="w-4 h-4" />
    }
}

export function ProjectHome({
    projects,
    teams,
    userRole,
    userId,
}: { projects: (Projects & { teams: Teams[] })[]; teams: Teams[]; userRole: string; userId: string }) {
    const [state, formAction] = useActionState(ProjectUpdate, null)
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
    const [currentProjectName, setCurrentProjectName] = useState<string>("")
    const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("")
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([])

    useEffect(() => {
        if (editingProjectId) {
            const projectToEdit = projects.find((p) => p.id === editingProjectId)
            if (projectToEdit) {
                setCurrentProjectName(projectToEdit.name)
                setCurrentProjectStatus(projectToEdit.status)
                setSelectedTeamIds(projectToEdit.teams.map((t) => t.id))
            }
        } else {
            setCurrentProjectName("")
            setCurrentProjectStatus("")
            setSelectedTeamIds([])
        }
    }, [editingProjectId, projects])

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border/50">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-foreground tracking-tight">Projeler</h1>
                        <p className="text-lg text-muted-foreground flex items-center gap-2">
                            <Workflow className="w-5 h-5 text-primary" />
                            {userRole === "admin"
                                ? `Toplam ${projects.length} proje (Tüm projeler)`
                                : `${projects.length} projeniz var`}
                        </p>
                    </div>
                    {userRole === "admin" && (
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            <ProjectCreatePage teams={teams} />
                        </Button>
                    )}
                </div>

                {projects.length === 0 ? (
                    <Card className="border-dashed border-2 border-border/50 bg-card/50">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                                <Workflow className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-semibold text-card-foreground mb-3">Henüz proje yok</h3>
                            <p className="text-muted-foreground text-lg max-w-md">
                                {userRole === "admin"
                                    ? "Henüz hiç proje oluşturulmamış. İlk projenizi oluşturmak için yukarıdaki butonu kullanın."
                                    : "Henüz hiçbir projeye dahil değilsiniz. Yöneticinizle iletişime geçin."}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map((project) => {
                            const isEditing = editingProjectId === project.id
                            return isEditing ? (
                                <Card key={project.id} className="border-primary/20 shadow-lg bg-card">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                                            <Edit3 className="w-5 h-5 text-primary" />
                                            Proje Düzenle
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form action={formAction} className="space-y-4">
                                            <input type="hidden" name="projectId" value={project.id} />

                                            <div className="space-y-2">
                                                <Label htmlFor={`name-${project.id}`} className="text-sm font-medium text-card-foreground">
                                                    Proje Adı
                                                </Label>
                                                <Input
                                                    id={`name-${project.id}`}
                                                    name="name"
                                                    value={currentProjectName}
                                                    onChange={(e) => setCurrentProjectName(e.target.value)}
                                                    className="bg-input border-border focus:border-primary focus:ring-ring"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`status-${project.id}`} className="text-sm font-medium text-card-foreground">
                                                    Durum
                                                </Label>
                                                <Input
                                                    id={`status-${project.id}`}
                                                    name="status"
                                                    value={currentProjectStatus}
                                                    onChange={(e) => setCurrentProjectStatus(e.target.value)}
                                                    className="bg-input border-border focus:border-primary focus:ring-ring"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    Takımlar
                                                </Label>
                                                <div className="max-h-32 overflow-y-auto border border-border rounded-md p-3 bg-input space-y-2">
                                                    {teams.map((team) => (
                                                        <Label
                                                            key={team.id}
                                                            className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-sm transition-colors"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name="teams"
                                                                value={team.id}
                                                                checked={selectedTeamIds.includes(team.id)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedTeamIds((prev) => [...prev, team.id])
                                                                    } else {
                                                                        setSelectedTeamIds((prev) => prev.filter((id) => id !== team.id))
                                                                    }
                                                                }}
                                                                className="rounded border-border text-primary focus:ring-ring"
                                                            />
                                                            <span className="text-sm text-card-foreground">{team.teamName}</span>
                                                        </Label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`time-${project.id}`}
                                                    className="text-sm font-medium text-card-foreground flex items-center gap-2"
                                                >
                                                    <CalendarDays className="w-4 h-4" />
                                                    Tarih
                                                </Label>
                                                <Input
                                                    id={`time-${project.id}`}
                                                    type="date"
                                                    name="time"
                                                    defaultValue={new Date(project.time).toISOString().split("T")[0]}
                                                    className="bg-input border-border focus:border-primary focus:ring-ring"
                                                />
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    type="submit"
                                                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                                                >
                                                    Kaydet
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setEditingProjectId(null)}
                                                    className="flex-1 border-border hover:bg-muted/50 transition-colors"
                                                >
                                                    İptal
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card
                                    key={project.id}
                                    className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 bg-card overflow-hidden"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-3 group-hover:text-primary transition-colors">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                    <Workflow className="w-5 h-5 text-primary" />
                                                </div>
                                                <span className="line-clamp-2">{project.name}</span>
                                            </CardTitle>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(project.status)}
                                            <Badge className={`${getStatusColor(project.status)} font-medium`}>{project.status}</Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <CalendarDays className="w-4 h-4" />
                                            <span className="text-sm">
                                                {new Date(project.time).toLocaleDateString("tr-TR", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        {project.teams.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <div className="flex flex-wrap gap-1">
                                                    {project.teams.slice(0, 2).map((team) => (
                                                        <Badge
                                                            key={team.id}
                                                            variant="secondary"
                                                            className="text-xs bg-slate-100 text-slate-700 border-slate-200"
                                                        >
                                                            {team.teamName}
                                                        </Badge>
                                                    ))}
                                                    {project.teams.length > 2 && (
                                                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-slate-200">
                                                            +{project.teams.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {userRole === "admin" && (
                                            <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium"
                                                >
                                                    Admin Görünümü
                                                </Badge>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => setEditingProjectId(project.id)}
                                                        size="sm"
                                                        variant="outline"
                                                        className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-200"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </Button>
                                                    <ProjectDeleteAlert projectId={project.id} />
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
