import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center bg-zinc-950 text-white min-h-[90vh]">
        {/* Background Image Overlay (Placeholder for future actual image) */}
        <div className="absolute inset-0 overflow-hidden bg-[url('https://images.unsplash.com/photo-1546708973-23114d100078?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Now booking for the 2026 season
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter max-w-5xl mb-6">
            Experience Sri Lanka in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              Unparalleled Luxury
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12 font-light">
            Curated itineraries, exclusive local goods, and unforgettable journeys designed exclusively for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/planner" className="flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Planning
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Destinations */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Iconic Destinations</h2>
              <p className="text-xl text-zinc-500 max-w-xl font-light">Discover the breathtaking landscapes and ancient heritage of the teardrop island.</p>
            </div>
            <Link href="/planner" className="group flex items-center gap-2 text-zinc-900 font-medium hover:text-amber-600 transition-colors">
              Explore all locations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ella", desc: "Misty mountains and tea estates.", img: "https://images.unsplash.com/photo-1579606032822-861f1c2eb20b?q=80&w=1000&auto=format&fit=crop" },
              { name: "Galle Fort", desc: "Colonial charm by the ocean.", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop" },
              { name: "Yala National Park", desc: "Exclusive leopard safaris.", img: "https://images.unsplash.com/photo-1517424268670-84518428a2a0?q=80&w=1000&auto=format&fit=crop" }
            ].map((dest, i) => (
              <div key={i} className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${dest.img})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-zinc-300">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Exclusive Experiences (Features) */}
      <section className="py-24 px-6 md:px-12 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-16">The Exclusive Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-zinc-100 mb-6 text-amber-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Verified Luxury</h3>
              <p className="text-zinc-500 font-light text-center max-w-sm">Every villa, resort, and guide is meticulously vetted by our team to guarantee world-class quality.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-zinc-100 mb-6 text-amber-500">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Tailored Needs</h3>
              <p className="text-zinc-500 font-light text-center max-w-sm">Your itinerary is built around your preferences, pace, and passions. No cookie-cutter tours.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-zinc-100 mb-6 text-amber-500">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">VIP Access</h3>
              <p className="text-zinc-500 font-light text-center max-w-sm">Skip the lines. Enjoy private viewings, helicopter transfers, and exclusive culinary events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Shop Essentials CTA */}
      <section className="relative py-32 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900"></div>
        {/* Subtle decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Arrive Prepared.</h2>
          <p className="text-xl text-zinc-400 font-light mb-10">
            From Ceylon Tea gifts to essential luxury travel gear, browse our exclusive shop to elevate your journey before it even begins.
          </p>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 px-10 py-4 rounded-full text-lg font-bold hover:bg-amber-400 transition-colors shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]">
            Shop The Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
