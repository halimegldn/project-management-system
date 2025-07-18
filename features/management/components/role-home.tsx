"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/generated/prisma";
import { RoleUpdate } from "./role-update";
import { useState } from "react";

export function RoleHomeComponent({ users }: { users: User[] }) {

    const [selectId, setSelectId] = useState<string | null>(null);
    const userId = users.find((user) => user.id === selectId)?.role;
    return (
        <div className="flex flex-col">
            {
                users.map((user) => (
                    <div key={user.id} className="flex justify-center gap-3">
                        <p>{user.name}</p>
                        <p>{user.role}</p>
                        <Button onClick={() => setSelectId(user.id)}>Güncelle</Button>
                    </div>
                ))
            }
            {
                selectId && (
                    <RoleUpdate
                        selectId={selectId}
                        currentId={userId || ""}
                    />
                )
            }
        </div>
    )
}