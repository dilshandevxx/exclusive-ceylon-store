import Link from "next/link";
import { ArrowLeft, Download, MapPin, Calendar, Users, Wallet } from "lucide-react";

const mockTripDetails = {
  id: "TRP-101",
  title: "Classic Ceylon Route",
  status: "Upcoming",
  dateRange: "Oct 12 - Oct 18, 2026",
  travelers: "2 Adults",
  budget: "Comfort",
  places: [
    { day: 1, location: "Colombo", activities: "Arrival, City Tour, Check-in at Galle Face Hotel." },
    { day: 2, location: "Kandy", activities: "Temple of the Tooth Relic, Royal Botanical Gardens." },
    { day: 3, location: "Ella", activities: "Scenic train ride from Kandy to Ella. Relax evening." },
    { day: 4, location: "Ella", activities: "Hike Little Adam's Peak. Visit Nine Arches Bridge." },
    { day: 5, location: "Yala", activities: "Transfer to Yala. Afternoon leopard safari." },
    { day: 6, location: "Galle", activities: "Drive to South Coast. Explore Galle Fort." },
    { day: 7, location: "Colombo", activities: "Transfer to airport. Departure." },
  ]
};

export default function TripDetailsPage({ params }: { params: { id: string } }) {
  // In a real app we'd fetch the trip by ID
  const trip = mockTripDetails;

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-4xl">
      <Link href="/my-trips" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-10 opacity-60"></div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-4">
              {trip.status}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
              {trip.title}
            </h1>
            <p className="text-zinc-500 font-mono text-sm">Booking Ref: {trip.id}</p>
          </div>
          
          <button className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg self-start">
            <Download className="w-4 h-4" />
            Download PDF Itinerary
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-zinc-100 mb-8">
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Calendar className="w-3 h-3"/> Dates</p>
            <p className="font-medium text-zinc-900">{trip.dateRange}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Users className="w-3 h-3"/> Travelers</p>
            <p className="font-medium text-zinc-900">{trip.travelers}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Wallet className="w-3 h-3"/> Budget Level</p>
            <p className="font-medium text-zinc-900">{trip.budget}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1"><MapPin className="w-3 h-3"/> Destinations</p>
            <p className="font-medium text-zinc-900">{trip.places.length} Days</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Itinerary Breakdown</h2>
          <div className="relative border-l-2 border-zinc-100 ml-3 md:ml-4 space-y-8">
            {trip.places.map((place, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 shadow-sm"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                  <span className="text-sm font-bold text-zinc-400 min-w-[60px]">Day {place.day}</span>
                  <h3 className="text-xl font-bold text-zinc-900">{place.location}</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed max-w-2xl bg-zinc-50 p-4 rounded-2xl border border-zinc-100 mt-2">
                  {place.activities}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-zinc-500">
        Ready to make changes? <Link href="/planner" className="font-medium text-black underline underline-offset-4">Open Planner</Link> or contact your dedicated travel concierge.
      </div>
      
    </div>
  );
}
