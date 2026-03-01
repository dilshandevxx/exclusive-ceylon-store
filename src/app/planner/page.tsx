"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Users, Wallet, Target } from "lucide-react";
import { useRouter } from "next/navigation";

const plannerSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  adults: z.number().min(1, "At least 1 adult required").max(10),
  children: z.number().min(0).max(10),
  budget: z.enum(["budget", "comfort", "luxury"]),
  pace: z.enum(["relaxed", "moderate", "fast"]),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
});

type PlannerFormValues = z.infer<typeof plannerSchema>;

const steps = [
  { id: "dates", title: "When", icon: Calendar },
  { id: "travelers", title: "Who", icon: Users },
  { id: "budget", title: "How Much", icon: Wallet },
  { id: "interests", title: "What", icon: Target },
];

export default function PlannerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PlannerFormValues>({
    resolver: zodResolver(plannerSchema),
    defaultValues: {
      adults: 2,
      children: 0,
      budget: "comfort",
      pace: "moderate",
      interests: [],
    },
  });

  const watchInterests = watch("interests");

  const toggleInterest = (interest: string) => {
    const current = watchInterests || [];
    if (current.includes(interest)) {
      setValue("interests", current.filter((i) => i !== interest));
    } else {
      setValue("interests", [...current, interest]);
    }
  };

  const onSubmit = (data: PlannerFormValues) => {
    // In a real app, we would save this to the DB and generate the itinerary
    // For now, we will store it in local/session storage to use in the mock itinerary view
    localStorage.setItem("tripDraft", JSON.stringify(data));
    router.push("/planner/itinerary");
  };

  const nextStep = () => {
    let isValid = true;
    if (currentStep === 0) {
      if (!watch("startDate") || !watch("endDate")) isValid = false;
    }
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Arrival Date</label>
              <input type="date" {...register("startDate")} className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Departure Date</label>
              <input type="date" {...register("endDate")} className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Adults</label>
              <input type="number" min="1" {...register("adults", { valueAsNumber: true })} className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
              {errors.adults && <p className="text-red-500 text-sm mt-1">{errors.adults.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Children</label>
              <input type="number" min="0" {...register("children", { valueAsNumber: true })} className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Budget Level</label>
              <div className="grid grid-cols-3 gap-4">
                {["budget", "comfort", "luxury"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setValue("budget", b as any)}
                    className={`py-3 px-4 rounded-xl border font-medium capitalize transition-colors ${
                      watch("budget") === b ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Travel Pace</label>
              <div className="grid grid-cols-3 gap-4">
                {["relaxed", "moderate", "fast"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setValue("pace", p as any)}
                    className={`py-3 px-4 rounded-xl border font-medium capitalize transition-colors ${
                      watch("pace") === p ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <label className="block text-sm font-medium text-zinc-700 mb-2">Key Interests</label>
            <div className="grid grid-cols-2 gap-4">
              {["Wildlife", "Beaches", "Culture & History", "Tea Country", "Hiking", "Food"].map((interest) => {
                const isSelected = watchInterests?.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`py-4 px-4 rounded-xl border font-medium text-left transition-colors ${
                      isSelected ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
            {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-50 py-12 px-6 flex flex-col pt-24 items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4 text-center">
          Design Your Journey
        </h1>
        <p className="text-lg text-zinc-600 mb-12 text-center">
          Tell us about your perfect trip, and we'll craft an exclusive itinerary.
        </p>

        <div className="flex justify-between items-center mb-12 relative w-full sm:w-3/4 mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -z-10 -translate-y-1/2"></div>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive ? "bg-black text-white" : isPast ? "bg-zinc-800 text-white" : "bg-white text-zinc-400 border border-zinc-200"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold mt-2 absolute -bottom-6 ${isActive || isPast ? "text-zinc-900" : "text-zinc-400"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm min-h-[400px] flex flex-col mt-8">
          <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-zinc-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 text-zinc-500 hover:text-black font-medium transition-colors disabled:opacity-30 disabled:hover:text-zinc-500"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg"
                >
                  Generate Itinerary <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
