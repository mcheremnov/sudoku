
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Sudoku<span className="text-blue-400">Master</span>
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-blue-300 transition">Home</Link>
          <Link href="/how-to-play" className="hover:text-blue-300 transition">How to Play</Link>
        </div>
      </div>
    </nav>
  );
}
