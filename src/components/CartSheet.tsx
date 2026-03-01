"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import { ShoppingBag, X, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 hover:text-black transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems() > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems()}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-900">Your Cart</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
                    <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 pb-1 justify-between">
                        <div>
                          <h3 className="font-medium text-zinc-900 line-clamp-2 leading-tight mb-1">{item.name}</h3>
                          <p className="text-zinc-500 font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-zinc-100 rounded-full px-2 py-1">
                            <button 
                              onClick={() => {
                                if (item.quantity > 1) updateQuantity(item.productId, item.quantity - 1)
                                else removeItem(item.productId)
                              }}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-xs font-medium text-red-500 hover:text-red-600 underline underline-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                  <div className="flex items-center justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>${totalPrice().toFixed(2)}</span>
                  </div>
                  <Link 
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-black text-white text-center py-4 rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
