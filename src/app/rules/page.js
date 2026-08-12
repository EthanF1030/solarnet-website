import SpaceBackground from "../components/SpaceBackground";

const discordRules = [
  {
    title: "Respect All Members",
    description:
      "Treat everyone with respect. Harassment, discrimination, hate speech, bullying, or targeted toxicity will not be tolerated.",
  },
  {
    title: "Keep Chat Appropriate",
    description:
      "Avoid excessive profanity, inappropriate content, NSFW material, or discussions that may make others uncomfortable.",
  },
  {
    title: "No Spam",
    description:
      "Do not spam messages, emojis, mentions, reactions, or repeated content. Excessive use of capital letters may also be considered spam.",
  },
  {
    title: "No Advertising",
    description:
      "Advertising other servers, communities, social media accounts, products, or services without staff approval is prohibited.",
  },
  {
    title: "Use Channels Correctly",
    description:
      "Keep conversations within the appropriate channels and follow any channel-specific guidelines.",
  },
  {
    title: "Respect Staff Decisions",
    description:
      "Staff are here to maintain a positive environment. Staff will always have the final say.",
  },
  {
    title: "No Impersonation",
    description:
      "Do not impersonate staff members, content creators, or other community members.",
  },
  {
    title: "Follow Discord’s Terms of Service",
    description:
      "All users must comply with Discord’s Community Guidelines and Terms of Service.",
  },
];

const minecraftRules = [
  {
    title: "No Griefing",
    description:
      "Destroying, modifying, or damaging another player’s builds, claims, farms, or property is strictly prohibited.",
  },
  {
    title: "No Stealing",
    description:
      "Do not take items, resources, or valuables from other players.",
  },
  {
    title: "Respect Other Players",
    description:
      "Harassment, bullying, excessive toxicity, or intentionally ruining another player’s experience is not allowed.",
  },
  {
    title: "No Cheating or Unfair Advantages",
    description:
      "The use of hacked clients, X-Ray, auto-clickers, macros, duplication glitches, exploits, or any other unfair advantages is prohibited.",
  },
  {
    title: "Exploit Restrictions",
    description:
      "This includes using the Nether Roof and Pie Chart exploits as it is unfair to the bedrock players. Please use your common sense.",
  },
  {
    title: "No Lag Machines",
    description:
      "Do not create builds, farms, or redstone contraptions that intentionally cause excessive server lag.",
  },
  {
    title: "Build Responsibly",
    description:
      "Avoid building too close to other players without permission.",
  },
  {
    title: "Use Common Sense",
    description:
      "Not every situation can be covered by a written rule. If you think it may be against the rules, use your common sense.",
  },
];

const punishmentRules = [
  {
    title: "Staff Discretion",
    description: "Punishments are issued at staff discretion.",
  },
  {
    title: "Staff Decisions",
    description:
      "Please remember that staff decisions are final, and we are here to make the server as enjoyable as possible for everyone.",
  },
  {
    title: "No Cracked Accounts",
    description: "Cracked Minecraft accounts are not permitted on Solarnet.",
  },
];

function RuleCard({ title, description, index }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-sm font-bold text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.12)]">
          {index + 1}
        </span>

        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      <p className="leading-relaxed text-gray-300">{description}</p>
    </div>
  );
}

function RuleSection({ eyebrow, title, description, rules }) {
  return (
    <section className="mb-16">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
        {eyebrow}
      </p>

      <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>

      <p className="mb-8 max-w-3xl text-gray-300">{description}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {rules.map((rule, index) => (
          <RuleCard
            key={rule.title}
            title={rule.title}
            description={rule.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default function RulesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="mb-16 rounded-3xl border border-white/10 bg-black/35 p-8 text-center shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-md md:p-12">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Cubert Transmission
          </p>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Community Rules
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
            Welcome to Solarnet. Our goal is to provide a fun, welcoming, and
            fair environment for all members of our community. By participating
            in our Discord server or Minecraft server, you agree to follow the
            rules outlined below.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
            Last updated July 24, 2026
          </div>
        </div>

        <RuleSection
          eyebrow="Discord Rules"
          title="Community Chat Guidelines"
          description="These rules apply to the Solarnet Discord server and all community spaces connected to it."
          rules={discordRules}
        />

        <RuleSection
          eyebrow="Minecraft Server Rules"
          title="Gameplay Conduct"
          description="These rules apply while playing on the Solarnet Minecraft server."
          rules={minecraftRules}
        />

        <RuleSection
          eyebrow="Punishments & Final Notes"
          title="Enforcement"
          description="Staff decisions are made to protect the community and keep the server enjoyable for everyone."
          rules={punishmentRules}
        />

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-8 text-center backdrop-blur-md">
          <p className="text-lg leading-relaxed text-gray-200">
            ☀️ Solarnet is built around community. Be respectful, have fun,
            help new players, and work together to make the server a place
            everyone enjoys being part of. ☀️
          </p>

          <p className="mt-5 text-sm uppercase tracking-[0.3em] text-cyan-400">
            Transmission routed by Cubert
          </p>
        </div>
      </section>
    </main>
  );
}