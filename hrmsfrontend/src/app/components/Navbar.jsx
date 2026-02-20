import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center gap-6">
            <Link href="/" className="font-bold text-lg">
                HRMS Lite
            </Link>

            <Link href="/" className="hover:underline">
                Employees
            </Link>
        </nav>
    );
}