import Link from "next/link";
import SpaceBackground from "../../components/SpaceBackground";

export default function StoreSuccessPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="w-full max-w-2xl rounded-3xl border border-cyan-400/20 bg-black/50 p-8 text-center shadow-[0_0_60px_rgba(34,211,238,0.12)] backdrop-blur-md md:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/40 bg-green-400/10 shadow-[0_0_35px_rgba(74,222,128,0.18)]">
            <span className="text-4xl">✓</span>
          </div>

          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Payment Complete
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">
            Thank you for supporting Solarnet
          </h1>

          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-gray-300">
            Your purchase was completed successfully through Tebex. Your rank or
            perks should be delivered automatically in-game shortly.
          </p>

          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
            <h2 className="mb-3 text-lg font-semibold text-white">
              What happens next?
            </h2>

            <div className="space-y-3 text-gray-300">
              <p>• Tebex will process your order and run the delivery commands.</p>
              <p>• Make sure you entered the correct Minecraft username.</p>
              <p>• If your rank does not appear, open a ticket in our Discord.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/store"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}