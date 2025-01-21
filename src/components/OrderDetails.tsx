import { Button } from "@/components/ui/button";
import { Printer, MessageSquare, Send, Clock, MapPin, User } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";

interface OrderDetailsProps {
  order: {
    id: string;
    customer: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      modifiers?: string[];
    }>;
    prepTime: string;
    dueTime: string;
    commentTime: string;
    status: string;
    type?: string;
    tableNumber?: string;
    deliveryAddress?: string;
    priority?: string;
    server?: string;
  };
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { can } = usePermissions();

  const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="p-6 border-l border-primary-light/10 h-full bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary-dark">{order.customer}</h2>
          <p className="text-sm text-secondary">{order.id}</p>
        </div>
        <div className="flex gap-2">
          {can('printOrders') && (
            <Button variant="outline" size="icon" className="hover:bg-primary-light/10">
              <Printer className="h-4 w-4" />
            </Button>
          )}
          {can('addComments') && (
            <Button variant="outline" size="icon" className="hover:bg-primary-light/10">
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
          {can('updateStatus') && (
            <Button variant="outline" size="icon" className="hover:bg-primary-light/10">
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-secondary flex items-center gap-1">
            <Clock className="h-4 w-4" /> Prep Time
          </p>
          <p className="font-medium">{order.prepTime}</p>
        </div>
        <div>
          <p className="text-sm text-secondary">Due Time</p>
          <p className="font-medium">{order.dueTime}</p>
        </div>
        <div>
          <p className="text-sm text-secondary">Last Update</p>
          <p className="font-medium">{order.commentTime}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {order.type && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary-light" />
            <span className="text-secondary">Type: </span>
            <span className="font-medium">{order.type}</span>
            {order.tableNumber && <span className="font-medium">- Table {order.tableNumber}</span>}
          </div>
        )}
        {order.deliveryAddress && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary-light" />
            <span className="text-secondary">Delivery Address: </span>
            <span className="font-medium">{order.deliveryAddress}</span>
          </div>
        )}
        {order.server && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-primary-light" />
            <span className="text-secondary">Server: </span>
            <span className="font-medium">{order.server}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-primary-dark">Order Items</h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-start p-3 bg-primary-light/5 rounded-md">
            <div>
              <p className="font-medium">{item.quantity}x {item.name}</p>
              {item.modifiers?.map((mod, i) => (
                <p key={i} className="text-sm text-secondary ml-4">+ {mod}</p>
              ))}
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="pt-4 border-t border-primary-light/10">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary-dark">Total</span>
            <span className="font-semibold text-primary-dark">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};