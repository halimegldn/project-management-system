

import { redirect } from "next/navigation"
import { signOut } from "@/lib/auth-client"
import { getCurrentUser } from "@/features/shared/data"

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/");
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="space-y-2">
                <p>
                    <strong>ID:</strong> {user.id}
                </p>
                <p>
                    <strong>Ad:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Rol:</strong> {user.role || "Rol bulunamadı"}
                </p>
                <p>
                    <strong>Oluşturulma:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Bilinmiyor"}
                </p>
            </div>
            {/* <button onClick={() => signOut()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Çıkış Yap
            </button> */}
        </main>
    )
}
