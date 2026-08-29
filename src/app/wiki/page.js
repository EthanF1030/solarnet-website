"use client";

import { useEffect, useMemo, useState } from "react";
import SpaceBackground from "../components/SpaceBackground";

const plugins = [
  {
    id: "sleep",
    name: "Solarnet Sleep",
    shortName: "Sleep",
    icon: "☾",
    summary: "Vote-to-skip-night controls and server configuration.",
    commands: [
      {
        syntax: "/sleep",
        description: "Shows the current sleep vote status and plugin help.",
        permission: "solarnetsleep.use",
        aliases: ["/ssleep"],
      },
      {
        syntax: "/sleep vote",
        description: "Votes to skip the current night when a vote is active.",
        permission: "solarnetsleep.use",
      },
      {
        syntax: "/sleep status",
        description: "Displays the number of votes still needed to skip the night.",
        permission: "solarnetsleep.use",
      },
      {
        syntax: "/sleep reload",
        description: "Reloads Solarnet Sleep configuration and messages.",
        permission: "solarnetsleep.admin",
        admin: true,
      },
    ],
  },
  {
    id: "koth",
    name: "Solarnet KOTH",
    shortName: "KOTH",
    icon: "♛",
    summary: "King of the Hill events, arenas, schedules, and administration.",
    commands: [
      {
        syntax: "/koth",
        description: "Opens KOTH help and shows the active event status.",
        permission: "solarnetkoth.use",
      },
      {
        syntax: "/koth status",
        description: "Shows the active hill, current capturer, and remaining time.",
        permission: "solarnetkoth.use",
      },
      {
        syntax: "/koth list",
        description: "Lists all configured KOTH arenas.",
        permission: "solarnetkoth.use",
      },
      {
        syntax: "/koth start <arena>",
        description: "Starts a KOTH event in the selected arena.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
      {
        syntax: "/koth stop",
        description: "Stops the currently active KOTH event.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
      {
        syntax: "/koth create <name>",
        description: "Creates a new arena using your current location.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
      {
        syntax: "/koth delete <arena>",
        description: "Permanently removes a configured KOTH arena.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
      {
        syntax: "/koth setpos1 <arena>",
        description: "Sets the first corner of an arena capture region.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
      {
        syntax: "/koth setpos2 <arena>",
        description: "Sets the second corner of an arena capture region.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
      {
        syntax: "/koth reload",
        description: "Reloads arenas, schedules, rewards, and messages.",
        permission: "solarnetkoth.admin",
        admin: true,
      },
    ],
  },
  {
    id: "enchantments",
    name: "Solarnet Enchantments",
    shortName: "Enchantments",
    icon: "✦",
    summary: "Custom enchantment books, recipes, and the cross-platform Runic Forge.",
    commands: [
      {
        syntax: "/se",
        description: "Shows Solarnet Enchantments help and available subcommands.",
        permission: "solarnetenchantments.use",
        aliases: ["/solarnetenchantments"],
      },
      {
        syntax: "/se forge",
        description: "Opens the Runic Forge to apply or combine custom enchantments.",
        permission: "solarnetenchantments.use",
        aliases: ["/se apply"],
      },
      {
        syntax: "/se list",
        description: "Lists every registered custom enchantment.",
        permission: "solarnetenchantments.use",
      },
      {
        syntax: "/se info <enchantment>",
        description: "Shows an enchantment's levels, effects, and compatible items.",
        permission: "solarnetenchantments.use",
      },
      {
        syntax: "/se give <player> <enchantment> <level>",
        description: "Gives a custom enchantment book to a player.",
        permission: "solarnetenchantments.admin",
        admin: true,
      },
      {
        syntax: "/se reload",
        description: "Reloads enchantments, recipes, configuration, and messages.",
        permission: "solarnetenchantments.admin",
        admin: true,
      },
    ],
  },
  {
    id: "discord-bridge",
    name: "Solarnet Discord Bridge",
    shortName: "Discord Bridge",
    icon: "↗",
    summary: "Minecraft and Discord account linking powered by the Cubert bridge.",
    commands: [
      {
        syntax: "/link",
        description: "Starts the process of linking your Minecraft account to Discord.",
        permission: "solarnetdiscordbridge.link",
      },
      {
        syntax: "/link status",
        description: "Checks the Discord linking status for your Minecraft account.",
        permission: "solarnetdiscordbridge.link",
      },
      {
        syntax: "/link cancel",
        description: "Cancels your active Discord account-linking request.",
        permission: "solarnetdiscordbridge.link",
      },
      {
        syntax: "/unlink confirm",
        description: "Unlinks the Minecraft account you are currently using from Discord.",
        permission: "solarnetdiscordbridge.unlink",
      },
      {
        syntax: "/discordbridge status",
        description: "Displays the current status and health of the Cubert bridge.",
        permission: "solarnetdiscordbridge.status",
        aliases: ["/dbridge status", "/cubertbridge status"],
        admin: true,
      },
      {
        syntax: "/discordbridge test",
        description: "Tests the server's connection to Cubert and reports the result.",
        permission: "solarnetdiscordbridge.test",
        aliases: ["/dbridge test", "/cubertbridge test"],
        admin: true,
      },
      {
        syntax: "/discordbridge queue",
        description: "Inspects the bridge retry queue and its pending entries.",
        permission: "solarnetdiscordbridge.queue",
        aliases: ["/dbridge queue", "/cubertbridge queue"],
        admin: true,
      },
      {
        syntax: "/discordbridge queue flush",
        description: "Manually flushes pending entries from the bridge retry queue.",
        permission: "solarnetdiscordbridge.queue",
        aliases: ["/dbridge queue flush"],
        admin: true,
      },
      {
        syntax: "/discordbridge reload",
        description: "Reloads the Discord Bridge configuration without restarting the server.",
        permission: "solarnetdiscordbridge.reload",
        aliases: ["/dbridge reload", "/cubertbridge reload"],
        admin: true,
      },
    ],
  },
];

const rankUpLevels = [
  {
    rank: 1,
    next: 2,
    requirement: "Break 500 Stone blocks",
    flight: "5 minutes",
    claimBlocks: 50,
  },
  {
    rank: 2,
    next: 3,
    requirement: "Break 500 Grass blocks",
    flight: "10 minutes",
    claimBlocks: 50,
  },
  {
    rank: 3,
    next: 4,
    requirement: "Kill 100 Zombies",
    flight: "15 minutes",
    claimBlocks: 75,
  },
  {
    rank: 4,
    next: 5,
    requirement: "Break 10,000 blocks of any type",
    flight: "15 minutes",
    claimBlocks: 75,
  },
  {
    rank: 5,
    next: 6,
    requirement: "Reach 10 hours of playtime",
    flight: "15 minutes",
    claimBlocks: 100,
  },
  {
    rank: 6,
    next: 7,
    requirement: "Cast 10 server votes",
    flight: "15 minutes",
    claimBlocks: 100,
  },
  {
    rank: 7,
    next: 8,
    requirement: "Have 64 Iron Ingots",
    flight: "15 minutes",
    claimBlocks: 100,
  },
  {
    rank: 8,
    next: 9,
    requirement: "Cast 15 server votes",
    flight: "15 minutes",
    claimBlocks: 100,
  },
  {
    rank: 9,
    next: 10,
    requirement: "Kill 500 mobs in total",
    flight: "30 minutes",
    claimBlocks: 100,
  },
  {
    rank: 10,
    next: 11,
    requirement: "Break 2,500 blocks of any type",
    flight: "30 minutes",
    claimBlocks: 100,
  },
  {
    rank: 11,
    next: 12,
    requirement: "Kill 150 Skeletons",
    flight: "1 hour",
    claimBlocks: 100,
  },
  {
    rank: 12,
    next: 13,
    requirement: "Break 20,000 blocks of any type",
    flight: "1 hour",
    claimBlocks: 100,
  },
  {
    rank: 13,
    next: 14,
    requirement: "Reach 24 hours of playtime",
    flight: "1 hour",
    claimBlocks: 100,
  },
  {
    rank: 14,
    next: 15,
    requirement: "Cast 30 server votes",
    flight: "1 hour",
    claimBlocks: 100,
  },
  {
    rank: 15,
    next: 16,
    requirement: "Have 64 Diamonds",
    flight: "1 hour",
    claimBlocks: 100,
  },
  {
    rank: 16,
    next: null,
    requirement: "Have 10 Emeralds",
    flight: "1 hour",
    claimBlocks: 100,
  },
];

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copyCommand}
      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
      aria-label={`Copy ${value}`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CommandCard({ command }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <code className="min-w-0 flex-1 overflow-x-auto text-sm font-semibold text-cyan-200 sm:text-base">
          {command.syntax}
        </code>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
              command.admin
                ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                : "border-green-400/30 bg-green-400/10 text-green-300"
            }`}
          >
            {command.admin ? "Admin" : "Player"}
          </span>

          <CopyButton value={command.syntax} />
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-gray-300">
        {command.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs">
        <span className="text-gray-500">Permission</span>
        <code className="rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 text-gray-300">
          {command.permission}
        </code>

        {command.aliases?.length ? (
          <>
            <span className="ml-1 text-gray-500">Aliases</span>
            {command.aliases.map((alias) => (
              <code
                key={alias}
                className="rounded-lg border border-white/10 bg-black/35 px-2.5 py-1.5 text-gray-300"
              >
                {alias}
              </code>
            ))}
          </>
        ) : null}
      </div>
    </article>
  );
}

function RankUpSection() {
  return (
    <section id="rankup" className="mb-16">
      <div className="mb-8 rounded-3xl border border-white/10 bg-black/35 p-8 backdrop-blur-md md:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
          Player Progression
        </p>

        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          How to Rank Up
        </h2>

        <p className="max-w-3xl leading-relaxed text-gray-300">
          Complete the requirement for your current rank, then use{" "}
          <code className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-cyan-200">
            /rankup
          </code>{" "}
          in-game. Every completed rank rewards temporary flight time, one Vote
          Crate Key, and bonus claim blocks.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Progression
            </p>
            <p className="mt-2 font-semibold text-white">16 player ranks</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Every Rank
            </p>
            <p className="mt-2 font-semibold text-white">1 Vote Crate Key</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Extra Rewards
            </p>
            <p className="mt-2 font-semibold text-white">
              Flight time and claim blocks
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rankUpLevels.map((level) => (
          <article
            key={level.rank}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                  Current Rank
                </p>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  Rank {level.rank}
                </h3>
              </div>

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                {level.next ? `Unlocks Rank ${level.next}` : "Final Challenge"}
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Requirement
              </p>
              <p className="mt-2 font-semibold text-gray-100">
                {level.requirement}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg border border-purple-400/20 bg-purple-400/10 px-2.5 py-1.5 text-purple-200">
                {level.flight} flight
              </span>
              <span className="rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1.5 text-yellow-200">
                1 Vote Key
              </span>
              <span className="rounded-lg border border-green-400/20 bg-green-400/10 px-2.5 py-1.5 text-green-200">
                +{level.claimBlocks} claim blocks
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function WikiPage() {
  const [query, setQuery] = useState("");
  const [activePlugin, setActivePlugin] = useState("all");
  const [access, setAccess] = useState("all");
  const [isStaff, setIsStaff] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkStaffAccess() {
      try {
        const response = await fetch("/api/me", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to check staff access.");
        }

        const data = await response.json();

        if (active) {
          setIsStaff(Boolean(data?.isStaff));
        }
      } catch (error) {
        if (active) {
          setIsStaff(false);
        }
      } finally {
        if (active) {
          setLoadingStaff(false);
        }
      }
    }

    checkStaffAccess();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isStaff && access === "admin") {
      setAccess("all");
    }
  }, [access, isStaff]);

  const visiblePlugins = useMemo(() => {
    const term = query.trim().toLowerCase();

    return plugins
      .filter(
        (plugin) => activePlugin === "all" || plugin.id === activePlugin
      )
      .map((plugin) => ({
        ...plugin,
        commands: plugin.commands.filter((command) => {
          if (command.admin && !isStaff) {
            return false;
          }

          const matchesAccess =
            access === "all" ||
            (access === "admin" ? command.admin : !command.admin);
          const searchableText = [
            command.syntax,
            command.description,
            command.permission,
            ...(command.aliases ?? []),
          ]
            .join(" ")
            .toLowerCase();

          return matchesAccess && (!term || searchableText.includes(term));
        }),
      }))
      .filter((plugin) => plugin.commands.length > 0);
  }, [query, activePlugin, access, isStaff]);

  const visibleCommandCount = (plugin) =>
    plugin.commands.filter((command) => isStaff || !command.admin).length;
  const totalCommands = plugins.reduce(
    (total, plugin) => total + visibleCommandCount(plugin),
    0
  );
  const resultCount = visiblePlugins.reduce(
    (total, plugin) => total + plugin.commands.length,
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="mb-10 rounded-3xl border border-white/10 bg-black/35 p-8 text-center shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-md md:p-12">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Solarnet Knowledge Base
          </p>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Solarnet Wiki
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
            Learn how player progression works and find every command you need
            to explore, compete, and manage Solarnet.
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl items-center rounded-2xl border border-white/10 bg-black/45 px-4 shadow-[0_0_35px_rgba(34,211,238,0.08)] transition focus-within:border-cyan-400/50">
            <span className="text-xl text-cyan-400" aria-hidden="true">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands, permissions, aliases, or descriptions..."
              className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-gray-500"
              aria-label="Search commands"
            />
          </div>
        </div>

        <RankUpSection />

        <div className="mb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Plugin Reference
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Server Commands
          </h2>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                Plugins
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActivePlugin("all")}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    activePlugin === "all"
                      ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-300"
                      : "border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/10"
                  }`}
                >
                  All commands ({totalCommands})
                </button>

                {plugins.map((plugin) => (
                  <button
                    type="button"
                    key={plugin.id}
                    onClick={() => setActivePlugin(plugin.id)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                      activePlugin === plugin.id
                        ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-300"
                        : "border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <span className="mr-2 text-cyan-300">{plugin.icon}</span>
                    {plugin.shortName} ({visibleCommandCount(plugin)})
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                Access
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  ["all", isStaff ? "All access" : "Player commands"],
                  ...(isStaff ? [["player", "Players"], ["admin", "Admin"]] : []),
                ].map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setAccess(value)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                      access === value
                        ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-300"
                        : "border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {!loadingStaff && !isStaff && (
                <p className="mt-3 text-xs text-gray-500">
                  Staff commands are only visible to authenticated staff members.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
          <p>
            <span className="font-semibold text-white">{resultCount}</span>{" "}
            {resultCount === 1 ? "command" : "commands"} found
          </p>

          {(query || activePlugin !== "all" || access !== "all") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActivePlugin("all");
                setAccess("all");
              }}
              className="font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Clear filters
            </button>
          )}
        </div>

        {visiblePlugins.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-black/35 p-12 text-center backdrop-blur-md">
            <p className="text-4xl text-cyan-400">⌕</p>
            <h2 className="mt-4 text-2xl font-bold">No commands found</h2>
            <p className="mt-2 text-gray-400">
              Try a different search or clear your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {visiblePlugins.map((plugin) => (
              <section key={plugin.id}>
                <div className="mb-5 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-2xl text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.1)]">
                    {plugin.icon}
                  </span>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                      Solarnet Plugin
                    </p>
                    <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                      {plugin.name}
                    </h2>
                    <p className="mt-2 text-gray-400">{plugin.summary}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {plugin.commands.map((command) => (
                    <CommandCard key={command.syntax} command={command} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-8 text-center backdrop-blur-md">
          <h2 className="text-2xl font-bold">Need more help?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-300">
            Join the Solarnet Discord and ask the community or open a support
            ticket if a command is not working as expected.
          </p>
          <a
            href="https://discord.gg/9uhKQ5nn"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Join Discord
          </a>
        </div>
      </section>
    </main>
  );
}
