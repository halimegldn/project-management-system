"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Users, CalendarDays, FileText, Workflow } from "lucide-react";
import type { Teams } from "@/lib/generated/prisma";
import { ProjectCreate } from "@/features/projects/actions";
import { useActionState } from "react";

interface ProjectCreatePageProps {
    teams: Teams[];
}

export function ProjectCreatePage({ teams }: ProjectCreatePageProps) {
    const [open, setOpen] = useState(false);
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);

    // Server action state
    type ActionState =
        | { success: true; message?: string }
        | { success: false; error?: unknown; message?: string }
        | null;

    const [state, formAction] = useActionState<ProjectCreatePageProps | any, FormData>(
        ProjectCreate as any,
        null
    );

    // Başarıyı izle ve modalı kapat
    useEffect(() => {
        if (state && (state as any).success) {
            setSelectedTeamIds([]);
            setOpen(false);
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span className="cursor-pointer">Yeni Proje</span>
            </DialogTrigger>

            <DialogContent className="bg-popover border-border shadow-2xl max-w-md">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Workflow className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold text-popover-foreground">
                                Yeni Proje Oluştur
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground mt-1">
                                Yeni bir proje oluşturun ve takımları atayın
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Artık handleFormSubmit yok; doğrudan formAction kullanıyoruz */}
                <form action={formAction} className="space-y-6 mt-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="project-name"
                            className="text-sm font-medium text-popover-foreground flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Proje Adı
                        </Label>
                        <Input
                            id="project-name"
                            name="name"
                            placeholder="Proje adını girin"
                            className="bg-input border-border focus:border-primary focus:ring-ring"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="project-status" className="text-sm font-medium text-popover-foreground">
                            Durum
                        </Label>
                        <Input
                            id="project-status"
                            name="status"
                            placeholder="Örn: Başlangıç, Devam Ediyor, Tamamlandı"
                            className="bg-input border-border focus:border-primary focus:ring-ring"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-popover-foreground flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Takımlar
                        </Label>
                        <div className="max-h-32 overflow-y-auto border border-border rounded-md p-3 bg-input space-y-2">
                            {teams.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-2">
                                    Henüz takım bulunmuyor
                                </p>
                            ) : (
                                teams.map((team) => (
                                    <Label
                                        key={team.id}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-sm transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            name="teams"                // <-- ÖNEMLİ: formData.getAll('teams')
                                            value={team.id}
                                            checked={selectedTeamIds.includes(team.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedTeamIds((prev) => [...prev, team.id]);
                                                } else {
                                                    setSelectedTeamIds((prev) => prev.filter((id) => id !== team.id));
                                                }
                                            }}
                                            className="rounded border-border text-primary focus:ring-ring"
                                        />
                                        <span className="text-sm text-popover-foreground">{team.teamName}</span>
                                    </Label>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="project-date"
                            className="text-sm font-medium text-popover-foreground flex items-center gap-2"
                        >
                            <CalendarDays className="w-4 h-4" />
                            Tarih
                        </Label>
                        <Input
                            id="project-date"
                            type="date"
                            name="time"
                            className="bg-input border-border focus:border-primary focus:ring-ring"
                            required
                        />
                    </div>

                    {(state as any)?.success === false && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                            <p className="text-sm text-destructive">{(state as any)?.message ?? "Hata oluştu"}</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1 border-border hover:bg-muted/50 transition-colors"
                        >
                            İptal
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Oluştur
                            </div>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
