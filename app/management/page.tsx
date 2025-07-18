import { getUser } from "@/features/shared/data"

export default async function ManagementPage() {

    const users = await getUser();
    return (
        <div className="flex flex-col">
            {
                users.map((user) => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.role}</p>
                    </div>
                ))
            }

            {/* <RoleUpdate /> */}
        </div>
    )
}