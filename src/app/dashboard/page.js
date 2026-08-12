import { auth } from "@/auth";
import SpaceBackground from "../components/SpaceBackground";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <SpaceBackground />

        <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-36">
          <div className="rounded-3xl border border-white/10 bg-black/45 p-8 text-center backdrop-blur-md">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Player Dashboard
            </p>

            <h1 className="mb-4 text-4xl font-bold">Not signed in</h1>

            <p className="mb-8 text-gray-300">
              You need to sign in with Discord before viewing your dashboard.
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-36">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/45 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-md">
          <div className="h-28 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/10" />

          <div className="px-8 pb-8">
            <div className="-mt-12 mb-6 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-5">
                <div className="rounded-full border-4 border-black bg-black shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={`${session.user.name}'s Discord avatar`}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10 text-3xl font-bold text-cyan-300">
                      {session.user.name?.charAt(0) ?? "?"}
                    </div>
                  )}
                </div>

                <div className="pb-2">
                  <p className="mb-2 text-sm uppercase tracking-[0.35em] text-cyan-400">
                    Player Dashboard
                  </p>

                  <h1 className="text-4xl font-bold">
                    Welcome, {session.user.name}
                  </h1>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-400">
                  Discord ID
                </p>
                <p className="break-all text-gray-200">{session.user.id}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-400">
                  Email
                </p>
                <p className="break-all text-gray-200">
                  {session.user.email ?? "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-400">
                  Minecraft Account
                </p>
                <p className="text-gray-400">Not linked yet</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-400">
                  Server Rank
                </p>
                <p className="text-gray-400">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}