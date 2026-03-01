"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call for mock checkout
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">Payment Successful!</h1>
        <p className="text-lg text-zinc-600 mb-8 max-w-md">
          Your order has been placed. We'll send you an email confirmation shortly.
        </p>
        <Link href="/shop" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-zinc-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">Your Cart is Empty</h1>
        <Link href="/shop" className="text-zinc-600 hover:text-black underline underline-offset-4 font-medium transition-colors">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-12">Checkout</h1>
      
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Order Summary</h2>
        <div className="flex flex-col gap-4 mb-6">
          {items.map(item => (
            <div key={item.productId} className="flex justify-between items-center text-zinc-700">
              <span className="font-medium">{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-100 pt-6 flex justify-between items-center font-bold text-2xl text-zinc-900">
          <span>Total</span>
          <span>${totalPrice().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Mock Payment Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" disabled className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Expiry</label>
              <input type="text" placeholder="MM/YY" disabled className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">CVC</label>
              <input type="text" placeholder="123" disabled className="w-full border border-zinc-200 rounded-xl px-4 py-3 bg-zinc-50" />
            </div>
          </div>
        </div>
        
        <p className="text-sm text-zinc-500 mb-8 italic">This is a mock checkout. No real payment is processed.</p>
        
        <button 
          disabled={isProcessing}
          type="submit" 
          className="w-full bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-zinc-800 transition-all flex justify-center items-center gap-2 disabled:opacity-70 shadow-lg"
        >
          {isProcessing ? "Processing..." : `Pay $${totalPrice().toFixed(2)}`}
          {!isProcessing && <ArrowRight className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
}
