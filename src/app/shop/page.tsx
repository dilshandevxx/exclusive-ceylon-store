import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

// Mock data fallback if DB is empty
const mockProducts = [
  { id: "1", name: "Premium Canvas Backpack", description: "Durable backpack.", price: 120, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Backpack"], category: { name: "Travel Gear" } },
  { id: "2", name: "Ceylon Sapphire Necklace", description: "Handcrafted silver.", price: 350, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Sapphire"], category: { name: "Local Crafts" } },
  { id: "3", name: "Tropical Safari Hat", description: "Wide-brimmed protection.", price: 45, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Safari+Hat"], category: { name: "Travel Gear" } },
  { id: "4", name: "Artisan Wooden Mask", description: "Traditional carved mask.", price: 85, images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Wooden+Mask"], category: { name: "Local Crafts" } }
];

export default async function ShopPage() {
  let products = [];
  try {
    products = await prisma.product.findMany({ include: { category: true } });
  } catch (e) {
    console.log("DB connection failed or empty, using mock products");
  }

  if (products.length === 0) {
    products = mockProducts as any;
  }

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">
          Shop Curated Travel Essentials
        </h1>
        <p className="text-lg text-zinc-600 mb-8">
          Browse our collection of handpicked gear, local artisan crafts, and exclusive travel packages for your Ceylon adventure.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
