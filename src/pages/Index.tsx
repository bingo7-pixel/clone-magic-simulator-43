import { useState } from "react";
import { OrderRow } from "@/components/OrderRow";
import { OrderDetails } from "@/components/OrderDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data
const mockOrders = [
  {
    id: "ORD#0001",
    customer: "John Doe",
    type: "Dine-in",
    date: "2024-04-10",
    time: "10:30 AM",
    server: "Mike",
    status: "delayed" as const,
    amount: 25.99,
    items: [
      { name: "Burger", quantity: 1, price: 15.99, modifiers: ["No onions", "Extra cheese"] },
      { name: "Fries", quantity: 1, price: 5.99 },
      { name: "Coke", quantity: 1, price: 4.01 }
    ],
    prepTime: "15 mins",
    dueTime: "10:45 AM",
    commentTime: "10:55 AM"
  },
  // Add more mock orders as needed
];

const Index = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(mockOrders[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOrderDetails = mockOrders.find(order => order.id === selectedOrder);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">Orders Dashboard</h1>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
              <Input
                placeholder="Search in dashboard..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Input
              type="date"
              className="w-48"
            />
            <Button variant="outline">
              All Waiters
            </Button>
            <Button variant="outline">
              All Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr] bg-white rounded-lg shadow-sm">
          <div className="divide-y">
            {mockOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onSelect={setSelectedOrder}
                isSelected={selectedOrder === order.id}
              />
            ))}
          </div>
          {selectedOrderDetails && (
            <OrderDetails order={selectedOrderDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;