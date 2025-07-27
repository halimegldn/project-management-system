import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getServerSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        return session
    } catch (error) {
        console.error("Server session error:", error)
        return null
    }
}

// Role kontrolü için yardımcı fonksiyon
export async function requireAuth(requiredRole?: string) {
    const session = await getServerSession()

    if (!session?.user) {
        throw new Error("Authentication required")
    }

    if (requiredRole && session.user.role !== requiredRole) {
        throw new Error("Insufficient permissions")
    }

    return session.user
}

// Admin kontrolü için
export async function requireAdmin() {
    return requireAuth("admin")
}
