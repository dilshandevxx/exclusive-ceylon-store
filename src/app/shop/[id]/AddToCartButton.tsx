"use client";

import { useCartStore } from "@/lib/cart";

export function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => {
        addItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
        });
      }}
      className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl"
    >
      Add to Cart
    </button>
  );
}
