"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SpaceBackground from "../../components/SpaceBackground";

const enchantments = [
  {
    id: "autosmelt",
    name: "AutoSmelt",
    category: "Gathering",
    maxLevel: 1,
    appliesTo: "Pickaxes",
    description: "Automatically smelts supported block drops.",
    levelDetails: [
      "Raw iron, raw gold, raw copper, and ancient debris are converted into their smelted drops.",
    ],
    note: "Cannot be combined with Silk Touch.",
    type: "Shaped",
    grid: [
      "Iron Ingot",
      "Blaze Powder",
      "Iron Ingot",
      "Coal",
      "Blaze Powder",
      "Coal",
      "Iron Ingot",
      "Furnace",
      "Iron Ingot",
    ],
  },
  {
    id: "tree_harvester",
    name: "Tree Harvester",
    category: "Gathering",
    maxLevel: 3,
    appliesTo: "Axes",
    description: "Harvests connected logs from natural trees.",
    levelDetails: [
      "Level I: up to 32 connected logs",
      "Level II: up to 64 connected logs",
      "Level III: up to 96 connected logs",
    ],
    note: "The tree must have nearby leaves so ordinary player builds are protected.",
    type: "Shaped",
    grid: [
      "Oak Log",
      "Iron Axe",
      "Oak Log",
      "Oak Sapling",
      "Book",
      "Oak Sapling",
      "Oak Log",
      "Emerald",
      "Oak Log",
    ],
  },
  {
    id: "obsidian_walker",
    name: "Obsidian Walker",
    category: "Utility",
    maxLevel: 3,
    appliesTo: "Boots",
    description: "Temporarily solidifies nearby surface lava into obsidian.",
    levelDetails: [
      "Level I: 1-block radius",
      "Level II: 2-block radius",
      "Level III: 3-block radius",
    ],
    note: "The temporary obsidian returns to lava after 5 seconds.",
    type: "Shaped",
    grid: [
      "Obsidian",
      "Magma Cream",
      "Obsidian",
      "Lava Bucket",
      "Book",
      "Lava Bucket",
      "Obsidian",
      "Soul Soil",
      "Obsidian",
    ],
  },
  {
    id: "vein_miner",
    name: "Vein Miner",
    category: "Gathering",
    maxLevel: 3,
    appliesTo: "Pickaxes",
    description: "Harvests connected blocks from the same ore vein.",
    levelDetails: [
      "Level I: up to 16 ore blocks",
      "Level II: up to 32 ore blocks",
      "Level III: up to 64 ore blocks",
    ],
    note: "Only connected blocks of exactly the same supported ore are mined.",
    type: "Shaped",
    grid: [
      "Redstone",
      "Diamond",
      "Redstone",
      "Diamond",
      "Book",
      "Diamond",
      "Redstone",
      "Diamond Pickaxe",
      "Redstone",
    ],
  },
  {
    id: "replanter",
    name: "Replanter",
    category: "Gathering",
    maxLevel: 1,
    appliesTo: "Hoes",
    description: "Automatically replants fully grown crops after harvesting.",
    levelDetails: [
      "Level I: replants supported mature crops using one seed or crop from the natural drops.",
    ],
    note: "This is a shapeless recipe, so the ingredients can be placed in any slots.",
    type: "Shapeless",
    grid: [
      "Book",
      "Wheat Seeds",
      "Carrot",
      "Potato",
      "Beetroot Seeds",
      "Bone Meal",
      null,
      null,
      null,
    ],
  },
  {
    id: "thunder_strike",
    name: "Thunder Strike",
    category: "Combat",
    maxLevel: 3,
    appliesTo: "Swords, axes, bows and crossbows",
    description: "Calls down lightning after a set number of successful hits.",
    levelDetails: [
      "Level I: triggers every 5 successful hits",
      "Level II: triggers every 4 successful hits",
      "Level III: triggers every 3 successful hits",
    ],
    note: "Higher levels also increase the enchantment's bonus damage.",
    type: "Shaped",
    grid: [
      "Copper Ingot",
      "Redstone",
      "Copper Ingot",
      "Redstone",
      "Enchanted Book",
      "Redstone",
      "Copper Ingot",
      "Redstone",
      "Copper Ingot",
    ],
  },
  {
    id: "wither",
    name: "Wither",
    category: "Combat",
    maxLevel: 3,
    appliesTo: "Swords, axes, bows and crossbows",
    description: "Afflicts struck enemies with the Wither effect.",
    levelDetails: [
      "Level I: 2 seconds",
      "Level II: 3.5 seconds",
      "Level III: 5 seconds",
    ],
    note: "Cannot be placed on the same item as Venom.",
    type: "Shaped",
    grid: [
      "Soul Sand",
      "Wither Rose",
      "Soul Sand",
      "Wither Rose",
      "Enchanted Book",
      "Wither Rose",
      "Soul Sand",
      "Wither Rose",
      "Soul Sand",
    ],
  },
  {
    id: "frostbite",
    name: "Frostbite",
    category: "Combat",
    maxLevel: 3,
    appliesTo: "Swords, axes, bows and crossbows",
    description: "Slows struck enemies and builds freezing damage.",
    levelDetails: [
      "Level I: 2 seconds of slowness and 3 seconds of freeze buildup",
      "Level II: 3 seconds of slowness and 5 seconds of freeze buildup",
      "Level III: 4 seconds of slowness and 7 seconds of freeze buildup",
    ],
    type: "Shaped",
    grid: [
      "Ice",
      "Packed Ice",
      "Ice",
      "Packed Ice",
      "Enchanted Book",
      "Packed Ice",
      "Ice",
      "Packed Ice",
      "Ice",
    ],
  },
  {
    id: "venom",
    name: "Venom",
    category: "Combat",
    maxLevel: 3,
    appliesTo: "Swords, axes, bows and crossbows",
    description: "Poisons enemies struck by the enchanted weapon.",
    levelDetails: [
      "Level I: 3 seconds",
      "Level II: 5 seconds",
      "Level III: 7 seconds",
    ],
    note: "Cannot be placed on the same item as Wither.",
    type: "Shaped",
    grid: [
      "Spider Eye",
      "Fermented Spider Eye",
      "Spider Eye",
      "Fermented Spider Eye",
      "Enchanted Book",
      "Fermented Spider Eye",
      "Spider Eye",
      "Fermented Spider Eye",
      "Spider Eye",
    ],
  },
  {
    id: "shadowstep",
    name: "Shadowstep",
    category: "Combat",
    maxLevel: 3,
    appliesTo: "Swords and axes",
    description: "Sneak while striking to teleport safely behind your target.",
    levelDetails: [
      "Level I: 12-second cooldown",
      "Level II: 8-second cooldown",
      "Level III: 5-second cooldown",
    ],
    note: "The ability only activates when a safe destination exists behind the target.",
    type: "Shaped",
    grid: [
      "Ender Pearl",
      "Ender Eye",
      "Ender Pearl",
      "Ender Eye",
      "Enchanted Book",
      "Ender Eye",
      "Ender Pearl",
      "Ender Eye",
      "Ender Pearl",
    ],
  },
  {
    id: "soulbound",
    name: "Soulbound",
    category: "Utility",
    maxLevel: 3,
    appliesTo: "Armor, tools and weapons",
    description: "Retains enchanted equipment after death based on its level.",
    levelDetails: [
      "Level I: keeps the item but consumes Soulbound",
      "Level II: keeps the item and drops Soulbound to Level I",
      "Level III: keeps the item and remains Level III",
    ],
    type: "Shaped",
    grid: [
      "Totem of Undying",
      "Gold Ingot",
      "Totem of Undying",
      "Gold Ingot",
      "Enchanted Book",
      "Gold Ingot",
      "Totem of Undying",
      "Gold Ingot",
      "Totem of Undying",
    ],
  },
];

const categories = ["All", "Gathering", "Combat", "Utility"];

function IngredientTile({ ingredient }) {
  if (!ingredient) {
    return (
      <div
        className="aspect-square rounded-xl border border-dashed border-white/[0.08] bg-black/20"
        aria-label="Empty crafting slot"
      />
    );
  }

  return (
    <div className="flex aspect-square min-w-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-black/45 p-1.5 text-center shadow-inner sm:p-2">
      <span className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg border border-orange-300/20 bg-orange-300/10 text-xs font-black text-orange-200 sm:h-8 sm:w-8">
        {ingredient
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </span>
      <span className="break-words text-[9px] font-medium leading-tight text-gray-300 sm:text-[10px]">
        {ingredient}
      </span>
    </div>
  );
}

function RecipeCard({ enchantment }) {
  return (
    <article
      id={enchantment.id}
      className="scroll-mt-32 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition hover:border-orange-300/30 md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
            {enchantment.category}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            {enchantment.name}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-purple-300/20 bg-purple-300/10 px-3 py-1 text-xs font-semibold text-purple-200">
            Max {enchantment.maxLevel === 1 ? "I" : "III"}
          </span>
          <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-xs font-semibold text-orange-200">
            Crafts Level I
          </span>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-gray-300">
        {enchantment.description}
      </p>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-3 text-sm">
        <span className="text-gray-500">Applies to: </span>
        <span className="font-semibold text-cyan-200">
          {enchantment.appliesTo}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-semibold text-white">Crafting recipe</h3>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
              {enchantment.type}
            </span>
          </div>

          <div className="mx-auto grid max-w-[19rem] grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/30 p-3">
            {enchantment.grid.map((ingredient, index) => (
              <IngredientTile
                key={`${enchantment.id}-${index}`}
                ingredient={ingredient}
              />
            ))}
          </div>

          {enchantment.type === "Shapeless" && (
            <p className="mt-3 text-center text-xs text-gray-500">
              Place these ingredients anywhere in the crafting grid.
            </p>
          )}
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Level effects</h3>
          <ul className="space-y-2">
            {enchantment.levelDetails.map((detail) => (
              <li
                key={detail}
                className="flex gap-3 rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2.5 text-sm leading-relaxed text-gray-300"
              >
                <span className="mt-0.5 text-orange-300">✦</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {enchantment.note && (
            <div className="mt-3 rounded-xl border border-yellow-300/20 bg-yellow-300/[0.06] p-3 text-sm leading-relaxed text-yellow-100/80">
              <span className="font-semibold text-yellow-200">Important: </span>
              {enchantment.note}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ForgeGuide() {
  const steps = [
    {
      number: "01",
      title: "Craft the book",
      description:
        "Use a crafting table and follow the recipe shown below. Every recipe creates a Level I custom enchantment book.",
    },
    {
      number: "02",
      title: "Open the Runic Forge",
      description:
        "Run /se forge in-game. /se apply opens the same Java and Bedrock compatible menu.",
    },
    {
      number: "03",
      title: "Place both inputs",
      description:
        "Put the equipment in the left Equipment Slot and the custom enchantment book in the right Book Slot.",
    },
    {
      number: "04",
      title: "Confirm the forge",
      description:
        "Check the result and experience cost, then click the result item to complete the forge.",
    },
  ];

  return (
    <section id="apply" className="scroll-mt-32">
      <div className="rounded-3xl border border-orange-300/20 bg-gradient-to-br from-orange-300/[0.1] via-black/40 to-purple-400/[0.08] p-7 shadow-[0_0_50px_rgba(251,146,60,0.08)] backdrop-blur-md md:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
          Runic Forge
        </p>
        <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          How to Apply Enchantments
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-gray-300">
          Custom books are applied through Solarnet&apos;s Runic Forge instead of
          a vanilla anvil. The forge previews the result before it consumes
          either item.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <span className="text-sm font-black tracking-[0.25em] text-orange-300">
                {step.number}
              </span>
              <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] p-4 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
              Left Slot
            </p>
            <p className="mt-2 font-bold text-white">Compatible Equipment</p>
          </div>
          <span className="text-center text-2xl text-gray-500">+</span>
          <div className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.07] p-4 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-300">
              Right Slot
            </p>
            <p className="mt-2 font-bold text-white">Custom Enchantment Book</p>
          </div>
          <span className="text-center text-2xl text-gray-500">→</span>
          <div className="rounded-2xl border border-green-300/20 bg-green-300/[0.07] p-4 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-green-300">
              Result
            </p>
            <p className="mt-2 font-bold text-white">Forged Equipment</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
              Applying a Book
            </p>
            <p className="mt-2 text-lg font-bold text-white">3 / 5 / 7 levels</p>
            <p className="mt-2 text-sm text-gray-400">
              Cost to apply Level I, II, or III to compatible equipment.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
              Combining Books
            </p>
            <p className="mt-2 text-lg font-bold text-white">4 / 6 levels</p>
            <p className="mt-2 text-sm text-gray-400">
              Combine matching Level I books for II, then matching II books for III.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
              Safe to Close
            </p>
            <p className="mt-2 text-lg font-bold text-white">Inputs are returned</p>
            <p className="mt-2 text-sm text-gray-400">
              Closing the forge returns unused equipment and books to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EnchantmentsWikiPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visibleEnchantments = useMemo(() => {
    const term = query.trim().toLowerCase();

    return enchantments.filter((enchantment) => {
      const matchesCategory =
        category === "All" || enchantment.category === category;
      const searchableText = [
        enchantment.name,
        enchantment.category,
        enchantment.appliesTo,
        enchantment.description,
        enchantment.note ?? "",
        ...enchantment.levelDetails,
        ...enchantment.grid.filter(Boolean),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!term || searchableText.includes(term));
    });
  }, [category, query]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36">
        <Link
          href="/wiki"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-cyan-300"
        >
          <span aria-hidden="true">←</span> Back to Wiki
        </Link>

        <div className="rounded-3xl border border-orange-300/20 bg-black/35 p-8 text-center shadow-[0_0_55px_rgba(251,146,60,0.1)] backdrop-blur-md md:p-12">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-orange-300">
            Solarnet Player Guide
          </p>
          <h1 className="text-5xl font-bold md:text-7xl">
            Custom Enchantments
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">
            Craft powerful enchantment books, combine them into higher levels,
            and apply them to your gear with the Runic Forge.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#recipes"
              className="rounded-xl bg-orange-400 px-6 py-3 font-semibold text-black transition hover:bg-orange-300"
            >
              Browse Recipes
            </a>
            <a
              href="#apply"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-gray-200 transition hover:border-cyan-300/30 hover:text-cyan-200"
            >
              How to Apply
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-bold text-orange-300">11</p>
            <p className="mt-1 text-sm text-gray-400">Craftable enchantments</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-bold text-purple-300">3</p>
            <p className="mt-1 text-sm text-gray-400">Maximum levels</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md">
            <p className="text-3xl font-bold text-cyan-300">/se forge</p>
            <p className="mt-1 text-sm text-gray-400">Open the Runic Forge</p>
          </div>
        </div>

        <div className="mt-16">
          <ForgeGuide />
        </div>

        <section id="recipes" className="mt-16 scroll-mt-32">
          <div className="mb-8">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-orange-300">
              Crafting Reference
            </p>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Enchantment Recipes
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-gray-400">
              Each recipe produces one Level I enchantment book. Use the Runic
              Forge to combine matching books when an enchantment supports
              higher levels.
            </p>
          </div>

          <div className="mb-8 rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
            <label className="flex items-center rounded-2xl border border-white/10 bg-black/35 px-4 transition focus-within:border-orange-300/40">
              <span className="text-xl text-orange-300" aria-hidden="true">
                ⌕
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search enchantments, ingredients, effects, or equipment..."
                className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-gray-500"
                aria-label="Search enchantment recipes"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? "border-orange-300/50 bg-orange-300/15 text-orange-200"
                      : "border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              <span className="font-semibold text-white">
                {visibleEnchantments.length}
              </span>{" "}
              {visibleEnchantments.length === 1
                ? "enchantment"
                : "enchantments"}{" "}
              found
            </p>

            {(query || category !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="font-semibold text-orange-200 transition hover:text-orange-100"
              >
                Clear filters
              </button>
            )}
          </div>

          {visibleEnchantments.length ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {visibleEnchantments.map((enchantment) => (
                <RecipeCard
                  key={enchantment.id}
                  enchantment={enchantment}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/15 bg-black/35 p-12 text-center backdrop-blur-md">
              <p className="text-4xl text-orange-300">⌕</p>
              <h2 className="mt-4 text-2xl font-bold">No recipes found</h2>
              <p className="mt-2 text-gray-400">
                Try another ingredient, effect, or category.
              </p>
            </div>
          )}
        </section>

        <div className="mt-16 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-8 text-center backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white">View recipes in-game</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-300">
            Use <code className="text-cyan-200">/se recipe</code> to open the
            full recipe browser, or use{" "}
            <code className="text-cyan-200">/se recipe &lt;enchantment&gt;</code>{" "}
            to open one recipe directly.
          </p>
          <Link
            href="/wiki"
            className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-gray-200 transition hover:border-cyan-300/30 hover:text-cyan-200"
          >
            Return to Command Wiki
          </Link>
        </div>
      </section>
    </main>
  );
}

