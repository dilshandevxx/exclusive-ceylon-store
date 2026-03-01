"use client";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { User } from "lucide-react";

type AuthButtonsProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function AuthButtons({ user }: AuthButtonsProps) {
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={32}
              height={32}
              className="rounded-full border border-zinc-200"
            />
          ) : (
            <div className="p-1.5 bg-zinc-100 rounded-full">
              <User className="w-5 h-5 text-zinc-600" />
            </div>
          )}
          <span className="text-sm font-medium text-zinc-900 hidden md:block">
            {user.name?.split(" ")[0]}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="text-sm font-medium text-zinc-500 hover:text-black transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => signIn()}
        className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
      >
        Sign In
      </button>
    </div>
  );
}
