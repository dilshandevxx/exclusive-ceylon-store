"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Wallet, MapPin, Target, CheckCircle, Edit3, Trash2 } from "lucide-react";

type TripDraft = {
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  budget: string;
  pace: string;
  interests: string[];
};

export default function ItineraryPage() {
  const [draft, setDraft] = useState<TripDraft | null>(null);
  const [days, setDays] = useState([
    { id: 1, location: "Colombo", notes: "Arrival and city tour. Check in at Galle Face Hotel." },
    { id: 2, location: "Kandy", notes: "Train journey to Kandy. Temple of the Tooth & Cultural Show." },
    { id: 3, location: "Ella", notes: "Scenic drive through tea plantations. Hike Little Adam's Peak." },
    { id: 4, location: "Yala", notes: "Morning safari. Spotting leopards and elephants." },
    { id: 5, location: "Galle", notes: "Relax at Unawatuna beach. Explore Galle Fort before departure." },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("tripDraft");
    if (data) {
      setDraft(JSON.parse(data));
    } else {
      router.push("/planner");
    }
  }, [router]);

  const removeDay = (id: number) => {
    setDays((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveTrip = () => {
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => {
      localStorage.removeItem("tripDraft");
      router.push("/my-trips");
    }, 1500);
  };

  if (!draft) return <div className="p-24 text-center">Loading your journey...</div>;

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">Your Exclusive Itinerary</h1>
          <p className="text-zinc-600">Based on your preferences, we've crafted a personalized route.</p>
        </div>
        <button 
          onClick={handleSaveTrip}
          disabled={isSaving}
          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
        >
          {isSaving ? "Saving..." : "Save Trip"}
          {!isSaving && <CheckCircle className="w-5 h-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Sidebar Summary */}
        <div className="lg:col-span-1 border border-zinc-200 bg-white rounded-3xl p-8 h-fit shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">Trip Details</h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase text-zinc-500 mb-1">Dates</p>
                <p className="font-medium text-zinc-900">{draft.startDate} to {draft.endDate}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase text-zinc-500 mb-1">Interests</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {draft.interests.map(i => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">{i}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase text-zinc-500 mb-1">Budget Setup</p>
                <p className="font-medium text-zinc-900 capitalize">{draft.budget} ({draft.pace} pace)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Days List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Daily Plan</h2>
          {days.map((day, index) => (
            <div key={day.id} className="relative bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => removeDay(day.id)} className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-zinc-50 w-24 h-24 rounded-2xl shrink-0 border border-zinc-100">
                <span className="text-sm font-semibold text-zinc-500">Day</span>
                <span className="text-3xl font-bold text-zinc-900">{index + 1}</span>
              </div>
              
              <div className="pt-2">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  {day.location}
                </h3>
                <p className="text-zinc-600 leading-relaxed max-w-lg">
                  {day.notes}
                </p>
              </div>
            </div>
          ))}
          <button className="w-full border-2 border-dashed border-zinc-300 rounded-3xl p-6 text-zinc-500 font-medium hover:text-black hover:border-zinc-400 transition-colors flex items-center justify-center gap-2">
            Add Another Day
          </button>
        </div>
      </div>
    </div>
  );
}
