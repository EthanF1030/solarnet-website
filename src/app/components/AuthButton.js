import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function AuthButton() {
  const session = await auth();

  if (!session) {
    return (
      <Link
        href="/login"
        className="hidden rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)] transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] md:block"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link
        href="/dashboard"
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300"
      >
        Dashboard
      </Link>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400 hover:text-black"
        >
          Logout
        </button>
      </form>
    </div>
  );
}