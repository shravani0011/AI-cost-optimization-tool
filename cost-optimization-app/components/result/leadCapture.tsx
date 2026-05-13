"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function LeadCapture() {
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [leadSaved, setLeadSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="rounded-3xl border bg-card p-8">
            <h3 className="text-2xl font-bold">
                Get Full Audit Report
            </h3>

            <p className="mt-2 text-muted-foreground">
                Receive future AI spend optimizations and
                savings opportunities.
            </p>

            <div className="mt-6 grid gap-4">
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="h-11 rounded-lg border bg-background px-4 text-sm outline-none"
                />

                <input
                    type="text"
                    placeholder="Company (optional)"
                    value={company}
                    onChange={(e) =>
                        setCompany(e.target.value)
                    }
                    className="h-11 rounded-lg border bg-background px-4 text-sm outline-none"
                />

                <input
                    type="text"
                    placeholder="Role (optional)"
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                    className="h-11 rounded-lg border bg-background px-4 text-sm outline-none"
                />

                <button
                    onClick={async () => {
                        setLoading(true);
                        const { error } =
                            await supabase
                                .from("leads")
                                .insert({
                                    email,
                                    company,
                                    role,
                                });

                        if (!error) {
                            setLeadSaved(true);
                        }
                        setLoading(false);
                    }}
                    className="mt-2 rounded-xl bg-black px-6 py-4 text-white transition hover:opacity-90"
                >
                    {loading ? "Saving..." : "Save My Audit"}
                </button>

                {leadSaved && (
                    <p className="text-sm text-green-600">
                        Audit saved successfully.
                    </p>
                )}
            </div>
        </div>
    );
}
