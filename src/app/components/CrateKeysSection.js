import BuyButton from "./BuyButton";

const crateKeys = [
  {
    id: "lunar",
    name: "Lunar Crate",
    tag: "Entry Tier",
    description:
      "Start your crate progression with Lunar-themed rewards and a chance to find a Stellar Key.",
    upgradeChance: "Small chance of receiving a Stellar Key",
    options: [
      {
        id: "lunar_key_1",
        label: "1 Key",
        price: "£1.50",
        purchaseName: "1 Lunar Crate Key",
      },
      {
        id: "lunar_key_5",
        label: "5 Keys",
        price: "£6.50",
        purchaseName: "5 Lunar Crate Keys",
      },
    ],
  },
  {
    id: "stellar",
    name: "Stellar Crate",
    tag: "Advanced Tier",
    description:
      "Unlock stronger Stellar-themed rewards and a chance to move up to the Nebula Crate.",
    upgradeChance: "Small chance of receiving a Nebula Key",
    options: [
      {
        id: "stellar_key_1",
        label: "1 Key",
        price: "£2.00",
        purchaseName: "1 Stellar Crate Key",
      },
      {
        id: "stellar_key_5",
        label: "5 Keys",
        price: "£9.00",
        purchaseName: "5 Stellar Crate Keys",
      },
    ],
  },
  {
    id: "nebula",
    name: "Nebula Crate",
    tag: "Premium Tier",
    description:
      "Open a premium selection of Nebula-themed rewards with a chance to reach the Galaxy Crate.",
    upgradeChance: "Small chance of receiving a Galaxy Key",
    options: [
      {
        id: "nebula_key_1",
        label: "1 Key",
        price: "£2.50",
        purchaseName: "1 Nebula Crate Key",
      },
      {
        id: "nebula_key_5",
        label: "5 Keys",
        price: "£11.50",
        purchaseName: "5 Nebula Crate Keys",
      },
    ],
  },
  {
    id: "galaxy",
    name: "Galaxy Crate",
    tag: "Top Tier",
    description:
      "Access the highest tier of Galaxy-themed crate rewards available on Solarnet.",
    upgradeChance: "The highest-tier crate in the progression",
    options: [
      {
        id: "galaxy_key_1",
        label: "1 Key",
        price: "£3.00",
        purchaseName: "1 Galaxy Crate Key",
      },
      {
        id: "galaxy_key_5",
        label: "5 Keys",
        price: "£14.00",
        purchaseName: "5 Galaxy Crate Keys",
      },
    ],
  },
];

function CrateCard({ crate }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-cyan-400/15" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">
            {crate.tag}
          </p>

          <h3 className="text-3xl font-bold text-white">{crate.name}</h3>
        </div>

        <p className="mb-5 leading-relaxed text-gray-300">
          {crate.description}
        </p>

        <div className="mb-6 rounded-2xl border border-purple-400/20 bg-purple-400/[0.07] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300">
            Crate Progression
          </p>
          <p className="mt-2 text-sm text-purple-100/80">
            {crate.upgradeChance}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          {crate.options.map((option) => (
            <div
              key={option.id}
              className="rounded-2xl border border-white/10 bg-black/30 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-semibold text-white">{option.label}</span>
                <span className="text-xl font-bold text-cyan-300">
                  {option.price}
                </span>
              </div>

              <BuyButton
                rank={option.id}
                rankName={option.purchaseName}
                buttonLabel={`Buy ${option.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function CrateKeysSection() {
  return (
    <section className="mt-20">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
          Crate Keys
        </p>

        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Choose Your Crate
        </h2>

        <p className="mx-auto max-w-3xl leading-relaxed text-gray-300">
          Purchase a single key or save with a five-key bundle. Keys are
          delivered automatically to the Minecraft username entered at checkout.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {crateKeys.map((crate) => (
          <CrateCard key={crate.id} crate={crate} />
        ))}
      </div>
    </section>
  );
}
