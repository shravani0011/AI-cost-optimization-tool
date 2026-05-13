"use client";

import { useRouter } from "next/navigation";

export function BackHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/");
      }}
      className="mb-6 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted cursor-pointer"
    >
      ← Back to Home
    </button>
  );
}