"use client";

import { useState } from "react";

export default function BuyButton({ rank }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleCheckout(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError("Please enter your Minecraft username.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rank,
                    username: trimmedUsername,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Checkout error:", data);

                throw new Error(
                    data?.details?.title ||
                    data?.details?.detail ||
                    data?.details?.message ||
                    data?.details?.error ||
                    data?.error ||
                    "Checkout failed."
                );
            }

            if (!data.checkoutUrl) {
                console.error("Missing checkout URL:", data);
                throw new Error("No checkout URL returned.");
            }

            window.location.href = data.checkoutUrl;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    function closeModal() {
        if (loading) return;

        setModalOpen(false);
        setError("");
        setUsername("");
    }

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="block w-full rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
            >
                Buy Now
            </button>

            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    {/* Backdrop */}
                    <button
                        type="button"
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        aria-label="Close checkout modal"
                    />

                    {/* Modal */}
                    <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-cyan-400/20 bg-black/90 shadow-[0_0_70px_rgba(34,211,238,0.18)] backdrop-blur-xl">
                        <div className="border-b border-white/10 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-cyan-400/10 px-6 py-5">
                            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-400">
                                Tebex Checkout
                            </p>

                            <h2 className="text-2xl font-bold text-white">
                                Enter Minecraft Username
                            </h2>
                        </div>

                        <form onSubmit={handleCheckout} className="p-6">
                            <p className="mb-5 leading-relaxed text-gray-300">
                                Enter the Minecraft username that should receive this rank. Make
                                sure it is spelled correctly before continuing to checkout.
                            </p>

                            <label
                                htmlFor={`minecraft-username-${rank}`}
                                className="mb-2 block text-sm font-semibold text-gray-200"
                            >
                                Minecraft Username
                            </label>

                            <input
                                id={`minecraft-username-${rank}`}
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Example: DemonDevMC"
                                maxLength={16}
                                autoFocus
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400/60 focus:bg-cyan-400/[0.06] focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Java usernames must be 3-16 characters and can only use letters, numbers, and underscores. Bedrock usernames may include a . before the name.
                            </p>

                            <div className="mt-4 rounded-xl border border-yellow-400/25 bg-yellow-400/10 px-4 py-3 text-left">
                                <p className="text-sm font-semibold text-yellow-300">
                                    Bedrock player warning
                                </p>

                                <p className="mt-1 text-sm leading-relaxed text-yellow-100/80">
                                    If you play on Bedrock, make sure to enter your username with a . before it. Entering the wrong username
                                    may delay or prevent your rank from being delivered.
                                </p>
                            </div>

                            {error && (
                                <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                                    {error}
                                </p>
                            )}

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Creating Checkout..." : "Continue to Checkout"}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={loading}
                                    className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}