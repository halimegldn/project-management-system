"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const res = await signUp.email({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });

        if (res.error) {
            setError(res.error.message || "Something went wrong.");
        } else {
            router.push("/signIn");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
            <div className="w-full max-w-md space-y-6 p-6 bg-neutral-900 rounded-xl shadow-lg border border-neutral-800">
                <h1 className="text-3xl font-bold text-center">Kayıt Ol</h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Ad Soyad</label>
                        <input
                            name="name"
                            placeholder="Örnek: Halime Gildan"
                            required
                            className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">E-Posta</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="mail@ornek.com"
                            required
                            className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Şifre</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="En az 8 karakter"
                            required
                            minLength={8}
                            className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2 transition"
                    >
                        Hesap Oluştur
                    </button>
                </form>

                <p className="text-sm text-center text-neutral-400">
                    Zaten hesabınız var mı? <a href="/sign-in" className="text-blue-500 hover:underline">Giriş yap</a>
                </p>
            </div>
        </main>
    );
}