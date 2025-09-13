import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
    return (
        <nav className="w-full shadow-lg py-4 px-6">
            <div className="max-w-4xl mx-auto flex justify-center items-center gap-8">
                <Link
                    href="/dashboard"
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
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition-colors duration-200"
                >
                    Rapor
                </Link>
                <ModeToggle />
            </div>
        </nav>
    );
}
