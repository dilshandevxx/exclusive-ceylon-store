import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    });
  } catch (e) {
    console.log("DB fetch failed");
  }

  // Fallback mock check
  if (!product) {
    const mockProducts = [
      { id: "1", name: "Premium Canvas Backpack", description: "Durable backpack.", price: 120, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Backpack"], category: { name: "Travel Gear" } },
      { id: "2", name: "Ceylon Sapphire Necklace", description: "Handcrafted silver.", price: 350, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Sapphire"], category: { name: "Local Crafts" } },
      { id: "3", name: "Tropical Safari Hat", description: "Wide-brimmed protection.", price: 45, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Safari+Hat"], category: { name: "Travel Gear" } },
      { id: "4", name: "Artisan Wooden Mask", description: "Traditional carved mask.", price: 85, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Wooden+Mask"], category: { name: "Local Crafts" } }
    ];
    product = mockProducts.find(p => p.id === params.id) as any;
  }

  if (!product) {
    return <div className="p-24 text-center">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <Link href="/shop" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="relative aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden shadow-sm">
          <Image
            src={product.images[0] || "https://placehold.co/600x800/e2e8f0/1e293b?text=Product"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="inline-block bg-zinc-100 px-3 py-1 rounded-full text-xs font-semibold text-zinc-600 mb-6 self-start">
            {product.category.name}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-emerald-600 mb-8">
            ${product.price.toFixed(2)}
          </p>
          <div className="prose prose-zinc prose-lg mb-10 text-zinc-600">
            <p>{product.description}</p>
          </div>
          
          <AddToCartButton product={{ ...product, images: product.images }} />
        </div>
      </div>
    </div>
  );
}
