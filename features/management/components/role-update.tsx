"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserUpdate } from "@/features/shared/actions";
import { useActionState, useEffect, useState } from "react"

export function RoleUpdate({ selectId, currentId }: { selectId: string; currentId: string }) {

    const [state, formAction] = useActionState(UserUpdate, null);
    const [role, setRole] = useState("");


    console.log("selectId:", selectId);

    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={selectId} />
            <Select value={role} onValueChange={setRole} name="role">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Kullanıcı Rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit">GÜncelle</Button>
        </form>
    )
}