"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Rules", href: "/rules" },
  { label: "Wiki", href: "/wiki" },
  { label: "Store", href: "/store" },
  { label: "Vote", href: "/vote" },
  { label: "Staff", href: "/staff" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [loadingMe, setLoadingMe] = useState(true);

  useEffect(() => {
    async function loadMe() {
      try {
        const response = await fetch("/api/me");
        const data = await response.json();
        setMe(data);
      } catch (error) {
        setMe({
          user: null,
          isStaff: false,
        });
      } finally {
        setLoadingMe(false);
      }
    }

    loadMe();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  const isSignedIn = Boolean(me?.user);
  const isStaff = Boolean(me?.isStaff);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <nav className="relative flex h-20 w-full items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 text-xl font-bold tracking-wide text-white"
        >
          <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)] transition group-hover:scale-125" />
          <span>
            Solarnet <span className="text-cyan-400">Network</span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-md lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition lg:px-5 ${
                  isActive
                    ? "bg-cyan-400/15 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}

                {isActive && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,1)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {loadingMe ? (
            <div className="h-10 w-24 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
          ) : isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300"
              >
                Dashboard
              </Link>

              {isStaff && (
                <Link
                  href="/staff-dashboard"
                  className="rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)] transition hover:bg-cyan-400 hover:text-black"
                >
                  Staff Panel
                </Link>
              )}

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400 hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)] transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition hover:bg-cyan-400 hover:text-black lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/90 px-6 pb-6 pt-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-400/15 text-cyan-300"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-white/10 pt-3">
              {loadingMe ? (
                <div className="h-12 w-full animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
              ) : isSignedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-gray-200 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300"
                  >
                    Dashboard
                  </Link>

                  {isStaff && (
                    <Link
                      href="/staff-dashboard"
                      onClick={closeMenu}
                      className="rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-3 text-center text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                    >
                      Staff Panel
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      signOut({ callbackUrl: "/" });
                    }}
                    className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400 hover:text-black"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-3 text-center text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
