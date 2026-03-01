import Link from 'next/link';
import { Compass, ShoppingBag, Map, Heart } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AuthButtons } from "./AuthButtons";
import { CartSheet } from "./CartSheet";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-black text-white p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">
            Exclusive Ceylon
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <Link href="/planner" className="hover:text-black transition-colors">
            Planner
          </Link>
          <Link href="/my-trips" className="hover:text-black transition-colors">
            My Trips
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <CartSheet />
          <AuthButtons user={session?.user} />
          <Link href="/planner" className="hidden sm:block text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors shadow-md">
            Start Planning
          </Link>
        </div>
      </div>
    </nav>
  );
}
