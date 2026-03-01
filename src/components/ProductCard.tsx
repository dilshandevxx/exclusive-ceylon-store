"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart";

type ProductProps = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: {
      name: string;
    };
  };
};

export function ProductCard({ product }: ProductProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <Link href={`/shop/${product.id}`} className="group relative block">
      <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
        <Image
          src={product.images[0] || "https://placehold.co/600x800/e2e8f0/1e293b?text=Product"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-zinc-800">
          {product.category.name}
        </div>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          aria-label="Add to cart"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-zinc-900 group-hover:text-black transition-colors">
          {product.name}
        </h3>
        <p className="text-zinc-500 font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
