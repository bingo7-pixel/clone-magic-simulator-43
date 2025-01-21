import { useState } from "react";
import { OrderRow } from "@/components/OrderRow";
import { OrderDetails } from "@/components/OrderDetails";
import Analytics from "@/components/Analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

// Enhanced mock data with more examples and comments
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
    commentTime: "10:55 AM",
    tableNumber: "T12",
    priority: "High",
    comments: [
      {
        text: "Customer requested extra napkins",
        timestamp: "10:35 AM",
        author: "Mike"
      },
      {
        text: "Allergic to peanuts - please note",
        timestamp: "10:40 AM",
        author: "Kitchen Staff"
      }
    ]
  },
  {
    id: "ORD#0002",
    customer: "Sarah Smith",
    type: "Takeaway",
    date: "2024-04-10",
    time: "10:35 AM",
    server: "Lisa",
    status: "ontime" as const,
    amount: 42.50,
    items: [
      { name: "Pizza", quantity: 1, price: 22.99, modifiers: ["Extra pepperoni"] },
      { name: "Wings", quantity: 2, price: 8.99, modifiers: ["Spicy"] },
      { name: "Garlic Bread", quantity: 1, price: 4.99 }
    ],
    prepTime: "20 mins",
    dueTime: "10:55 AM",
    commentTime: "10:40 AM",
    priority: "Medium",
    comments: [
      {
        text: "Customer will arrive at 11:00 AM",
        timestamp: "10:36 AM",
        author: "Lisa"
      }
    ]
  },
  {
    id: "ORD#0003",
    customer: "Michael Johnson",
    type: "Delivery",
    date: "2024-04-10",
    time: "10:40 AM",
    server: "Tom",
    status: "critical" as const,
    amount: 68.75,
    items: [
      { name: "Steak", quantity: 2, price: 29.99, modifiers: ["Medium rare", "Extra sauce"] },
      { name: "Salad", quantity: 1, price: 8.99 },
      { name: "Wine", quantity: 1, price: 19.99 }
    ],
    prepTime: "25 mins",
    dueTime: "11:05 AM",
    commentTime: "10:45 AM",
    deliveryAddress: "123 Main St",
    priority: "High",
    comments: [
      {
        text: "Special instructions: Ring doorbell twice",
        timestamp: "10:41 AM",
        author: "Tom"
      },
      {
        text: "Customer requested contactless delivery",
        timestamp: "10:42 AM",
        author: "Dispatch"
      }
    ]
  }
];

const Index = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(mockOrders[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  const selectedOrderDetails = mockOrders.find(order => order.id === selectedOrder);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4 text-primary-dark">Restaurant Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-primary-light/10">
              <TabsTrigger value="orders" className="data-[state=active]:bg-primary-light data-[state=active]:text-white">Orders</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary-light data-[state=active]:text-white">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
                  <Input
                    placeholder="Search in dashboard..."
                    className="pl-10 border-primary-light/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Input
                  type="date"
                  className="w-48 border-primary-light/20"
                />
                <Button variant="outline" className="border-primary-light/20 hover:bg-primary-light/10">
                  All Waiters
                </Button>
                <Button variant="outline" className="border-primary-light/20 hover:bg-primary-light/10">
                  All Status
                </Button>
              </div>
              <div className="grid grid-cols-[2fr,1fr] bg-white rounded-lg shadow-sm border border-primary-light/10">
                <div className="divide-y divide-primary-light/10">
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
            </TabsContent>
            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;