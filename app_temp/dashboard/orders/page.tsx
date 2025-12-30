import { Card } from "@/components/ui/primitives";

export default function OrdersPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Customer Orders</h2>
      <Card className="p-0">
        <div className="p-6 text-center text-slate-400">
          <p>Your order history will appear here once payments are processed.</p>
        </div>
      </Card>
    </div>
  );
}
