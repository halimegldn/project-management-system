"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TaskDeleteAction } from "../actions";

export function TaskDeleteAlert({ taskId }: { taskId: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("id", taskId);

            const result = await TaskDeleteAction(null as any, formData);

            if (result?.success) {
                setOpen(false);
                router.refresh();
            } else {
                console.error(result?.message ?? "Silme işlemi başarısız.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                Sil
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Görevi silmek istediğinize emin misiniz?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <AlertDialogCancel onClick={() => setOpen(false)}>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={loading}>
                            {loading ? "Siliniyor..." : "Sil"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
