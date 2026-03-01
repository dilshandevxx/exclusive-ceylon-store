import Link from "next/link";
import { Calendar, MapPin, ChevronRight, Map } from "lucide-react";

const mockTrips = [
  { id: "TRP-101", title: "Classic Ceylon Route", duration: "7 Days", status: "Upcoming", date: "Oct 12, 2026", locations: 4 },
  { id: "TRP-102", title: "South Coast Escape", duration: "5 Days", status: "Past", date: "Dec 05, 2025", locations: 2 }
];

export default function MyTripsPage() {
  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">My Journeys</h1>
          <p className="text-zinc-600">Manage your upcoming itineraries and review past trips.</p>
        </div>
        <Link href="/planner" className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors inline-block text-center shadow-md">
          Plan New Trip
        </Link>
      </div>

      <div className="flex gap-4 border-b border-zinc-200 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {["All Trips", "Upcoming", "Past", "Drafts"].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? "text-black border-b-2 border-black" : "text-zinc-500 hover:text-zinc-800"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTrips.map((trip) => (
          <Link key={trip.id} href={`/my-trips/${trip.id}`} className="group relative bg-white border border-zinc-200 rounded-3xl p-8 hover:shadow-xl hover:border-zinc-300 transition-all cursor-pointer overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full -z-10 opacity-50 transition-transform group-hover:scale-110"></div>
            
            <div className="flex justify-between items-start mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                trip.status === "Upcoming" ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"
              }`}>
                {trip.status}
              </span>
              <div className="p-2 bg-zinc-50 rounded-full group-hover:bg-zinc-100 transition-colors">
                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-zinc-900 mb-4 pr-12 group-hover:text-emerald-700 transition-colors">{trip.title}</h2>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-500">
              <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                <Calendar className="w-4 h-4 text-zinc-400" />
                {trip.date}
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                <MapPin className="w-4 h-4 text-zinc-400" />
                {trip.locations} Stops
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                <Map className="w-4 h-4 text-zinc-400" />
                {trip.duration}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
