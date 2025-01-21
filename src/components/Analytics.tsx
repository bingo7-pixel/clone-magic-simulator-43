import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data - replace with real data when connected to backend
const ordersByStatus = [
  { status: "On Time", count: 45 },
  { status: "Delayed", count: 12 },
  { status: "Critical", count: 5 },
];

const ordersByTime = [
  { hour: "9AM", orders: 5 },
  { hour: "10AM", orders: 8 },
  { hour: "11AM", orders: 12 },
  { hour: "12PM", orders: 15 },
  { hour: "1PM", orders: 10 },
  { hour: "2PM", orders: 7 },
];

const Analytics = () => {
  const totalOrders = ordersByStatus.reduce((sum, item) => sum + item.count, 0);
  const delayedOrders = ordersByStatus.find(
    (item) => item.status === "Delayed"
  )?.count;
  const criticalOrders = ordersByStatus.find(
    (item) => item.status === "Critical"
  )?.count;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Today's order count</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delayed Orders</CardTitle>
            <CardDescription>Orders behind schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{delayedOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Critical Orders</CardTitle>
            <CardDescription>Requires immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{criticalOrders}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
            <CardDescription>Distribution of order statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6E41E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Time</CardTitle>
            <CardDescription>Today's order timeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersByTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#6E41E2"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;