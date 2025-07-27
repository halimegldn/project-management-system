"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/generated/prisma";
import { RoleUpdate } from "./role-update";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function RoleHomeComponent({ users }: { users: User[] }) {
    const [selectId, setSelectId] = useState<string | null>(null);
    const userId = users.find((user) => user.id === selectId)?.role;

    return (
        <div className="space-y-6 p-4 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Kullanıcı Rolleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between border p-3 rounded-lg shadow-sm"
                        >
                            <div className="space-y-1">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">Rol: {user.role}</p>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => setSelectId(user.id)}>
                                Güncelle
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {selectId && (
                <>
                    <Separator />
                    <RoleUpdate selectId={selectId} currentId={userId || ""} />
                </>
            )}
        </div>
    );
}
