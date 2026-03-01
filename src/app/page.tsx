import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center bg-gradient-to-b from-white to-zinc-50">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 text-sm font-medium text-zinc-900 mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          Now booking for the 2026 season
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-4xl mb-6">
          Experience Sri Lanka in <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500">
            Unparalleled Luxury
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl mb-12 font-light">
          Curated itineraries, exclusive local goods, and unforgettable journeys designed just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/planner" className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-800 transition-all hover:scale-105 shadow-xl">
            Start Planning
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/shop" className="flex items-center justify-center gap-2 bg-white text-black border border-zinc-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-50 transition-all hover:scale-105 shadow-sm">
            Shop Essentials
          </Link>
        </div>
      </section>
    </div>
  );
}
