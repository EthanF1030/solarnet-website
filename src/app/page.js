import SpaceBackground from "./components/SpaceBackground";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
          Minecraft Survival Network
        </p>

        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
          Solarnet Network
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-300">
          A new space-themed Minecraft survival experience with custom features,
          community events, and a world built for players.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/rules"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            View Rules
          </a>

          <a
            href="/store"
            className="rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Visit Store
          </a>
        </div>
      </section>

      {/* Partner section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/45 shadow-[0_0_60px_rgba(34,211,238,0.1)] backdrop-blur-md">
          <div className="border-b border-white/10 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-cyan-400/10 px-8 py-6">
            <p className="mb-2 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Official Partner
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              SolarNet x Zealous
            </h2>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-5 text-lg leading-relaxed text-gray-300">
                SolarNet is partnered with{" "}
                <span className="font-semibold text-cyan-300">Zealous</span>, a
                server hosting company that helps power our network.
              </p>

              <p className="mb-8 leading-relaxed text-gray-300">
                Zealous offers more than just Minecraft hosting. They provide
                hosting solutions for multiple games, including Rust, Hytale,
                and more.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://zealous.host"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-cyan-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
                >
                  Visit Zealous
                </a>

                <a
                  href="https://discord.gg/hVVewWtmgV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Join Their Discord
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="mb-5 text-sm uppercase tracking-[0.3em] text-cyan-400">
                Hosting Features
              </p>

              <div className="space-y-4 text-gray-200">
                <div className="flex items-center gap-3">
                  <span>⚡</span>
                  <span>Ryzen CPUs</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>💾</span>
                  <span>NVMe storage</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>🛡️</span>
                  <span>DDoS protection</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>☁️</span>
                  <span>Backups</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>🖥️</span>
                  <span>Easy-to-use panels</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>🎮</span>
                  <span>Hosting for multiple games</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-8 py-5 text-center text-sm text-gray-400">
            Big thanks to Zealous for working with us ❤️
          </div>
        </div>
      </section>
    </main>
  );
}