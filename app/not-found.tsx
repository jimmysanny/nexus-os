import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white space-y-4">
      <h1 className="text-6xl font-black text-indigo-600">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-slate-400">The page you are looking for does not exist.</p>
      <Link href="/dashboard" className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-slate-200 transition">
        Return Home
      </Link>
    </div>
  );
}
