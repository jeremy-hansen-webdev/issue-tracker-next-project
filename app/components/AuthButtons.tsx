"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading…</div>;

  if (!session) {
    return (
      <button className="cursor-pointer text-gray-700" onClick={() => signIn("google")}>
        Log In
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Hi, {session.user?.name}</span>
      <button className="btn" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
