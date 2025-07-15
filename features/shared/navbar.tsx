import Link from "next/link";

export function Navbar() {
    return (
        <nav className="w-full bg-neutral-600 text-white shadow-lg py-4 px-6">
            <div className="max-w-4xl mx-auto flex justify-center items-center gap-8">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition-colors duration-200"
                >
                    Dashboard
                </Link>
                <Link
                    href="/projects"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition-colors duration-200"
                >
                    Projeler
                </Link>
                <Link
                    href="/teams"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition-colors duration-200"
                >
                    Takımlar
                </Link>
                <Link
                    href="/tasks"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition-colors duration-200"
                >
                    Tasklar
                </Link>
            </div>
        </nav>
    );
}
