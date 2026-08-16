import SpaceBackground from "../components/SpaceBackground";
import BuyButton from "../components/BuyButton";

const packages = [
  {
    id: "comet",
    name: "Comet",
    price: "£3.99",
    tag: "Starter Rank",
    description:
      "A starter supporter rank with useful quality-of-life perks and a clean supporter identity.",
    perks: [
      "Supporter role on Discord",
      "10 minutes extra fly time per day",
      "Access to /nickname without colors",
      "/hat - wear any item as a hat",
      "1 extra playervault, total of 2",
      "1 extra home, total of 2",
    ],
  },
  {
    id: "nova",
    name: "Nova",
    price: "£11.99",
    tag: "Supporter Rank",
    description:
      "A stronger supporter rank with more daily fly time, nickname colors, and extra storage.",
    perks: [
      "Supporter role on Discord",
      "20 minutes extra fly time per day",
      "Access to /nickname with colors",
      "/hat - wear any item as a hat",
      "2 extra playervaults, total of 3",
      "2 extra homes, total of 3",
      "Access to purple and pink in-game chat color",
      "Access to /echest",
      "Access to /ext",
    ],
  },
  {
    id: "cosmic",
    name: "Cosmic",
    price: "£22.99",
    tag: "Premium Rank",
    description:
      "A premium supporter rank with better utility, more colors, and expanded player storage.",
    perks: [
      "Supporter role on Discord",
      "30 minutes extra fly time per day",
      "Access to /nickname with colors and formatting",
      "/hat - wear any item as a hat",
      "4 extra playervaults, total of 5",
      "4 extra homes, total of 5",
      "Access to purple and pink in-game chat color",
      "Access to blue and aqua in-game chat color",
      "Access to HeadDatabase",
      "Access to /feed",
      "Access to /echest",
    ],
  },
  {
    id: "celestial",
    name: "Celestial",
    price: "£37.99",
    tag: "Ultimate Rank",
    description:
      "The highest supporter rank with the full supporter perk set and the most customization.",
    perks: [
      "Supporter role on Discord",
      "40 minutes extra fly time per day",
      "Access to /nickname",
      "/hat - wear any item as a hat",
      "5 extra playervaults, total of 6",
      "5 extra homes, total of 6",
      "Access to every chat color and formatting",
      "Access to HeadDatabase",
      "Access to /ext",
      "Access to /heal",
      "Access to /feed",
      "Access to /pweather",
      "Access to /ptime",
      "Access to /echest",
    ],
  },
];

const extras = [
  {
    name: "Crate Keys",
    description: "Optional reward keys for fun cosmetic-style extras.",
  },
  {
    name: "Cosmetics",
    description: "Particles, tags, trails, and other visual upgrades.",
  },
  {
    name: "Bundles",
    description: "Limited-time bundles for events and seasonal updates.",
  },
];

function PackageCard({ item }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">
              {item.tag}
            </p>

            <h2 className="text-3xl font-bold text-white">{item.name}</h2>
          </div>

          <p className="text-2xl font-bold text-cyan-300">{item.price}</p>
        </div>

        <p className="mb-6 leading-relaxed text-gray-300">{item.description}</p>

        <div className="mb-8 space-y-3">
          {item.perks.map((perk) => (
            <div key={perk} className="flex items-center gap-3 text-gray-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

     <BuyButton rank={item.id} />
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Solarnet Store
          </p>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Support the Network
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
            Help support Solarnet’s development, hosting, events, and future
            updates. Store items will be connected to Tebex later.
          </p>
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-3">
          {packages.map((item) => (
            <PackageCard key={item.name} item={item} />
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/35 p-8 backdrop-blur-md">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
                Extra Categories
              </p>

              <h2 className="text-3xl font-bold text-white">
                More Store Options
              </h2>
            </div>

            <p className="max-w-2xl text-gray-300">
              These sections can later connect to Tebex packages, categories,
              baskets, and checkout.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {extras.map((extra) => (
              <div
                key={extra.name}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
              >
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {extra.name}
                </h3>

                <p className="text-gray-300">{extra.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6 text-center backdrop-blur-md">
          <p className="text-gray-200">
            Payments are not active yet. This page is just the store design
            until Tebex integration is added.
          </p>
        </div>
      </section>
    </main>
  );
}