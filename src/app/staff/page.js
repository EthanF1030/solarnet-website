import SpaceBackground from "../components/SpaceBackground";

const owners = [
  {
    name: "DemonDev",
    role: "Owner",
    emoji: "https://cdn.discordapp.com/emojis/1530265280595366040.png?size=128",
  },
  {
    name: "Jay",
    role: "Owner",
    emoji: "https://cdn.discordapp.com/emojis/1530265276006797402.png?size=128",
  },
];


const staffInfo = [
  {
    title: "Community Support",
    description:
      "Our staff team helps players, answers questions, and keeps the community welcoming.",
  },
  {
    title: "Fair Moderation",
    description:
      "Punishments and decisions are handled carefully to protect the server experience.",
  },
  {
    title: "Server Growth",
    description:
      "The team works together to improve Solarnet with events, updates, and feedback.",
  },
];

function StaffCard({ member }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

      <div className="relative z-10">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/40 bg-black/50 p-3 shadow-[0_0_25px_rgba(34,211,238,0.16)] transition group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.28)]">
          <img
            src={member.emoji}
            alt={`${member.name} emoji`}
            className="h-full w-full object-contain"
          />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-white">{member.name}</h2>

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
          {member.role}
        </p>

        <p className="leading-relaxed text-gray-300">{member.description}</p>
      </div>
    </div>
  );
}

function InfoCard({ item }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-md transition hover:border-cyan-400/30 hover:bg-white/[0.05]">
      <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
      <p className="leading-relaxed text-gray-300">{item.description}</p>
    </div>
  );
}

export default function StaffPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Solarnet Team
          </p>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Meet the Staff
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
            The Solarnet staff team helps manage the community, support players,
            and keep the server fair, welcoming, and fun.
          </p>
        </div>

        <section className="mb-16">
          <div className="mb-8">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Leadership
            </p>

            <h2 className="text-3xl font-bold text-white">Owners</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {owners.map((member) => (
              <StaffCard key={member.name} member={member} />
            ))}
          </div>
        </section>
        <section className="grid gap-6 md:grid-cols-3">
          {staffInfo.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </section>

        <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-8 text-center backdrop-blur-md">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Need help from staff?
          </h2>

          <p className="mx-auto max-w-2xl text-gray-300">
            Join the Solarnet Discord and open a ticket if you need support,
            want to report an issue, or have a question for the team.
          </p>
        </div>
      </section>
    </main>
  );
}