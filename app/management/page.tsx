import { Button } from "@/components/ui/button";
import { RoleHomeComponent } from "@/features/management/components/role-home";
import { RoleUpdate } from "@/features/management/components/role-update";
import { getUser } from "@/features/shared/data"

export default async function ManagementPage() {

    const users = await getUser();
    return (
        <RoleHomeComponent users={users} />
    )
}