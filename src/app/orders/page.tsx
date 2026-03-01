import { Clock, Package, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-9823",
    date: "2026-02-15",
    status: "Delivered",
    total: 395.0,
    items: [
      { name: "Ceylon Sapphire Necklace", quantity: 1, price: 350.0 },
      { name: "Tropical Safari Hat", quantity: 1, price: 45.0 },
    ],
  },
  {
    id: "ORD-8472",
    date: "2026-01-20",
    status: "Processing",
    total: 120.0,
    items: [
      { name: "Premium Canvas Backpack", quantity: 1, price: 120.0 },
    ],
  }
];

export default function OrderHistoryPage() {
  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Order History</h1>
        <Link href="/shop" className="text-zinc-600 hover:text-black font-medium transition-colors">
          Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-8">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Order Number</p>
                  <p className="font-medium text-zinc-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Date Placed</p>
                  <p className="font-medium text-zinc-900">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total</p>
                  <p className="font-medium text-zinc-900">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-zinc-400" />
                Items
              </h4>
              <ul className="divide-y divide-zinc-100">
                {order.items.map((item, idx) => (
                  <li key={idx} className="py-4 flex justify-between items-center text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
                        {/* Mock image placeholder */}
                        <Package className="w-5 h-5 opacity-50" />
                      </div>
                      <span className="text-zinc-800">{item.name} <span className="text-zinc-400 font-normal ml-2">x {item.quantity}</span></span>
                    </div>
                    <span className="text-zinc-600">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-zinc-50 border-t border-zinc-100 p-4 text-center">
              <Link href="#" className="text-sm font-medium text-black hover:text-zinc-600 transition-colors inline-flex items-center gap-1">
                View Invoice <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
