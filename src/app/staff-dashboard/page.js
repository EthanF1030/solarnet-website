"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpaceBackground from "../components/SpaceBackground";

function MessageCard({ eyebrow, title, message, children, denied = false }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-36">
        <div
          className={`rounded-3xl border bg-black/45 p-8 text-center backdrop-blur-md ${
            denied ? "border-red-400/20" : "border-white/10"
          }`}
        >
          <p
            className={`mb-3 text-sm uppercase tracking-[0.35em] ${
              denied ? "text-red-300" : "text-cyan-400"
            }`}
          >
            {eyebrow}
          </p>

          <h1 className="mb-4 text-4xl font-bold">{title}</h1>
          <p className="mb-8 text-gray-300">{message}</p>
          {children}
        </div>
      </section>
    </main>
  );
}

export default function StaffDashboardPage() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAccess() {
      try {
        const response = await fetch("/api/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to check staff access.");
        }

        const data = await response.json();

        if (active) {
          setMe(data);
        }
      } catch (error) {
        if (active) {
          setMe({
            user: null,
            isStaff: false,
            error: true,
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAccess();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <MessageCard
        eyebrow="Staff Dashboard"
        title="Checking staff access"
        message="Confirming your Solarnet Discord role..."
      >
        <div className="mx-auto h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-400" />
        </div>
      </MessageCard>
    );
  }

  if (!me?.user) {
    return (
      <MessageCard
        eyebrow="Staff Dashboard"
        title={me?.error ? "Unable to verify access" : "Sign in required"}
        message={
          me?.error
            ? "The website could not verify your session. Refresh the page or sign in again."
            : "You need to sign in with Discord before accessing staff tools."
        }
      >
        <Link
          href="/login"
          className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Go to Login
        </Link>
      </MessageCard>
    );
  }

  if (me.isStaff !== true) {
    return (
      <MessageCard
        eyebrow="Access Denied"
        title="Staff only"
        message="Your Discord account is signed in, but it does not have an approved Solarnet staff role."
        denied
      >
        <Link
          href="/dashboard"
          className="inline-block rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-gray-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          Back to Dashboard
        </Link>
      </MessageCard>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <SpaceBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-36">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Solarnet Staff
          </p>

          <h1 className="mb-4 text-5xl font-bold">Staff Dashboard</h1>

          <p className="max-w-3xl text-gray-300">
            Welcome, {me.user.name}. Your Discord account has an approved staff
            role.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">Applications</h2>
            <p className="text-gray-300">Review player applications later.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">Appeals</h2>
            <p className="text-gray-300">Handle ban appeals later.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <h2 className="mb-3 text-xl font-bold text-white">
              Player Lookup
            </h2>
            <p className="text-gray-300">Search linked players later.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
