"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserUpdate } from "@/features/shared/actions";
import { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function RoleUpdate({ selectId, currentId }: { selectId: string; currentId: string }) {
    const router = useRouter();
    const [state, formAction] = useActionState(UserUpdate, null);
    const [role, setRole] = useState(currentId || "");

    useEffect(() => {
        if (state?.success) {
            router.push("/management");
        }
    }, [state, router]);

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Rol Güncelle</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <Input type="hidden" name="id" value={selectId} />

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Rol Seç</label>
                        <Select value={role} onValueChange={setRole} name="role">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Kullanıcı Rolü" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">
                        Güncelle
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
