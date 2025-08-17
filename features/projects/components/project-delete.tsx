"use client"

import { ProjectDelete } from "../actions"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, startTransition, useActionState, useEffect } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"

export function ProjectDeleteAlert({ projectId }: { projectId: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);

        startTransition(async () => {
            setLoading(true);

            try {
                const formData = new FormData();
                formData.append("projectId", projectId);

                const result = await ProjectDelete(projectId, formData);

                if (result.success) {
                    setOpen(false);
                    router.refresh();
                } else {
                    console.error(result.message);
                }
            } catch (err) {
                console.error(err);
            }
        });
    };

    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                Sil
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Projeyi silmek istediğinize emin misiniz?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            İptal
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={loading}>
                            {loading ? "Siliniyor..." : "Sil"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
