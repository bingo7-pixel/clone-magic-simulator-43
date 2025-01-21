import { Button } from "@/components/ui/button";
import { Printer, MessageSquare, Send } from "lucide-react";
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
  };
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { can } = usePermissions();

  return (
    <div className="p-6 border-l h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{order.customer}</h2>
          <p className="text-sm text-secondary">{order.id}</p>
        </div>
        <div className="flex gap-2">
          {can('printOrders') && (
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
          )}
          {can('addComments') && (
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
          {can('updateStatus') && (
            <Button variant="outline" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-secondary">Prep Time</p>
          <p className="font-medium">{order.prepTime}</p>
        </div>
        <div>
          <p className="text-sm text-secondary">Due Time</p>
          <p className="font-medium">{order.dueTime}</p>
        </div>
        <div>
          <p className="text-sm text-secondary">Comment</p>
          <p className="font-medium">{order.commentTime}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Order Items</h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <p className="font-medium">{item.quantity}x {item.name}</p>
              {item.modifiers?.map((mod, i) => (
                <p key={i} className="text-sm text-secondary ml-4">+ {mod}</p>
              ))}
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};