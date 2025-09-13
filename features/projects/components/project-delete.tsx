"use client"

import { ProjectDelete } from "../actions"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, startTransition } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, AlertTriangle } from "lucide-react"

export function ProjectDeleteAlert({ projectId }: { projectId: string }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = () => {
        setLoading(true)

        startTransition(async () => {
            setLoading(true)

            try {
                const formData = new FormData()
                formData.append("projectId", projectId)

                const result = await ProjectDelete(projectId, formData)

                if (result.success) {
                    setOpen(false)
                    router.refresh()
                } else {
                    console.error(result.message)
                }
            } catch (err) {
                console.error(err)
            }
        })
    }

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
            >
                <Trash2 className="w-4 h-4" />
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="bg-popover border-border shadow-2xl">
                    <AlertDialogHeader className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-destructive" />
                            </div>
                            <div>
                                <AlertDialogTitle className="text-xl font-semibold text-popover-foreground">
                                    Projeyi Sil
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground mt-1">
                                    Bu işlem geri alınamaz
                                </AlertDialogDescription>
                            </div>
                        </div>

                        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                            <p className="text-sm text-popover-foreground">
                                Bu projeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve projeyle ilgili tüm veriler
                                kalıcı olarak silinecektir.
                            </p>
                        </div>
                    </AlertDialogHeader>

                    <div className="flex justify-end gap-3 mt-6">
                        <AlertDialogCancel
                            onClick={() => setOpen(false)}
                            className="border-border hover:bg-muted/50 transition-colors"
                        >
                            İptal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                                    Siliniyor...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Sil
                                </div>
                            )}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
