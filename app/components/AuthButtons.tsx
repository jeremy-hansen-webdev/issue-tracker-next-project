"use client";
import Skeleton from "@/lib";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading")
    return (
      <div className="flex items-center gap-2">
        <Skeleton circle width={60} height={60} />
      </div>
    );

  if (!session) {
    return (
      <button
        className="cursor-pointer text-gray-700"
        onClick={() => signIn("google")}
      >
        Log In
      </button>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full"
      >
        <Image
          src={session.user?.image ?? "/default-profile.png"}
          alt={
            session.user?.name
              ? `${session.user.name}'s profile picture`
              : "User profile picture"
          }
          width={60}
          height={60}
          className="rounded-full cursor-pointer hover:opacity-90"
        />
      </button>

      {/* Dropdown menu (overlay) */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border bg-white p-2 shadow-lg z-50">
          <p className="px-2 py-1 text-sm font-medium">{session.user?.name}</p>
          <p className="px-2 pb-2 text-xs text-gray-500 truncate">
            {session.user?.email}
          </p>

          <button
            className="w-full rounded-lg px-3 py-2 text-left text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
