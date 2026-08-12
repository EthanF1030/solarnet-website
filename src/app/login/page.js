import SpaceBackground from "../components/SpaceBackground";
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/45 p-8 text-center shadow-[0_0_50px_rgba(34,211,238,0.1)] backdrop-blur-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
            <span className="text-3xl">🛰️</span>
          </div>

          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Account Access
          </p>

          <h1 className="mb-4 text-4xl font-bold">Sign in to Solarnet</h1>

          <p className="mb-8 leading-relaxed text-gray-300">
            Sign in with Discord to access your player account, applications,
            appeals, and staff tools if you are part of the team.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("discord", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-xl bg-[#5865F2] px-5 py-4 font-semibold text-white transition hover:bg-[#4752C4]"
            >
              Continue with Discord
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Staff pages will only unlock for approved Solarnet staff accounts.
          </p>
        </div>
      </section>
    </main>
  );
}