import SpaceBackground from "../components/SpaceBackground";

const voteLinks = [
  {
    name: "Vote Site #1",
    description: "Support Solarnet and help new players discover the server.",
    href: "#",
  },
  {
    name: "Vote Site #2",
    description: "Vote daily to help boost the network.",
    href: "#",
  },
  {
    name: "Vote Site #3",
    description: "Another place to support the Solarnet community.",
    href: "#",
  },
  {
    name: "Vote Site #4",
    description: "More votes means more visibility for the server.",
    href: "#",
  },
];

function VoteCard({ vote }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

      <div className="relative z-10">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Vote Link
        </p>

        <h2 className="mb-4 text-2xl font-bold text-white">{vote.name}</h2>

        <p className="mb-6 leading-relaxed text-gray-300">
          {vote.description}
        </p>

        <a
          href={vote.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
        >
          Vote Now
        </a>
      </div>
    </div>
  );
}

export default function VotePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Support Solarnet
          </p>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Vote for the Server
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
            Vote daily to help Solarnet grow, reach new players, and build a
            stronger community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {voteLinks.map((vote) => (
            <VoteCard key={vote.name} vote={vote} />
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6 text-center backdrop-blur-md">
          <p className="text-gray-200">
            Thank you for supporting Solarnet! Your votes help us grow and reach new players. We appreciate your dedication to the community and look forward to seeing you in-game!
          </p>
        </div>
      </section>
    </main>
  );
}