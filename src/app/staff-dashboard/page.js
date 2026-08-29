import { auth } from "@/auth";
import SpaceBackground from "../components/SpaceBackground";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StaffDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <SpaceBackground />

        <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-36">
          <div className="rounded-3xl border border-white/10 bg-black/45 p-8 text-center backdrop-blur-md">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Staff Dashboard
            </p>

            <h1 className="mb-4 text-4xl font-bold">Sign in required</h1>

            <p className="mb-8 text-gray-300">
              You need to sign in with Discord before accessing staff tools.
            </p>

            <Link
              href="/login"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Go to Login
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const isStaff = session.user.isStaff === true;

  if (!isStaff) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <SpaceBackground />

        <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-36">
          <div className="rounded-3xl border border-red-400/20 bg-black/45 p-8 text-center backdrop-blur-md">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-300">
              Access Denied
            </p>

            <h1 className="mb-4 text-4xl font-bold">Staff only</h1>

            <p className="mb-8 text-gray-300">
              Your Discord account is signed in, but it does not have an approved
              Solarnet staff role.
            </p>

            <Link
              href="/dashboard"
              className="inline-block rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-gray-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Solarnet Staff
          </p>

          <h1 className="mb-4 text-5xl font-bold">Staff Dashboard</h1>

          <p className="max-w-3xl text-gray-300">
            Welcome, {session.user.name}. Your Discord account has an approved
            staff role.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">Applications</h2>
            <p className="text-gray-300">Review player applications later.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">Appeals</h2>
            <p className="text-gray-300">Handle ban appeals later.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">
              Player Lookup
            </h2>
            <p className="text-gray-300">Search linked players later.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
