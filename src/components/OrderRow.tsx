import { Printer, MessageSquare, Send } from "lucide-react";
import { OrderStatus } from "./OrderStatus";
import { Button } from "@/components/ui/button";

interface OrderRowProps {
  order: {
    id: string;
    customer: string;
    type: string;
    date: string;
    time: string;
    server: string;
    status: "delayed" | "ontime" | "critical";
    amount: number;
  };
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const OrderRow = ({ order, onSelect, isSelected }: OrderRowProps) => {
  return (
    <div 
      className={cn(
        "grid grid-cols-[auto,1fr,auto,auto,auto,auto,auto] gap-4 items-center p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors",
        isSelected && "bg-muted"
      )}
      onClick={() => onSelect(order.id)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(order.id)}
        className="h-4 w-4 rounded border-gray-300"
      />
      <div className="flex items-center gap-2">
        <span className="font-medium">{order.id}</span>
        <span className="text-secondary">- {order.customer}</span>
      </div>
      <span className="text-sm text-secondary">{order.type}</span>
      <span className="text-sm text-secondary">{order.time}</span>
      <span className="text-sm text-secondary">{order.server}</span>
      <OrderStatus status={order.status} />
      <span className="font-medium">${order.amount.toFixed(2)}</span>
    </div>
  );
};