import { Button } from "@/components/ui/button";
import { Printer, MessageSquare, Send, Clock, MapPin, User, AlertTriangle } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
    comments?: Array<{
      text: string;
      timestamp: string;
      author: string;
    }>;
  };
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { can } = usePermissions();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePrint = () => {
    toast({
      title: "Printing order",
      description: `Order ${order.id} has been sent to the printer.`
    });
  };

  const handleStatusUpdate = () => {
    toast({
      title: "Status updated",
      description: `Order ${order.id} status has been updated.`
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Comment added",
      description: `Comment has been added to order ${order.id}`
    });
    setNewComment("");
    setShowCommentBox(false);
  };

  return (
    <div className="p-6 border-l border-primary-light/10 h-full bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#66023C]">{order.customer}</h2>
          <p className="text-sm text-[#7851A9]">{order.id}</p>
        </div>
        <div className="flex gap-2">
          {can('printOrders') && (
            <Button 
              variant="outline" 
              size="icon" 
              className="hover:bg-[#4B0082]/10"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
            </Button>
          )}
          {can('addComments') && (
            <Button 
              variant="outline" 
              size="icon" 
              className="hover:bg-[#4B0082]/10"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
          {can('updateStatus') && (
            <Button 
              variant="outline" 
              size="icon" 
              className="hover:bg-[#4B0082]/10"
              onClick={handleStatusUpdate}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {showCommentBox && (
        <div className="mb-6 space-y-2">
          <Textarea
            placeholder="Add your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] border-[#800080]/20"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCommentBox(false)}
              className="text-[#66023C]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddComment}
              className="bg-[#66023C] hover:bg-[#4B0082]"
            >
              Add Comment
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-[#7851A9] flex items-center gap-1">
            <Clock className="h-4 w-4" /> Prep Time
          </p>
          <p className="font-medium">{order.prepTime}</p>
        </div>
        <div>
          <p className="text-sm text-[#7851A9]">Due Time</p>
          <p className="font-medium">{order.dueTime}</p>
        </div>
        <div>
          <p className="text-sm text-[#7851A9]">Last Update</p>
          <p className="font-medium">{order.commentTime}</p>
        </div>
      </div>

      {order.priority === "High" && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">High Priority Order</span>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {order.type && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[#800080]" />
            <span className="text-[#7851A9]">Type: </span>
            <span className="font-medium">{order.type}</span>
            {order.tableNumber && <span className="font-medium">- Table {order.tableNumber}</span>}
          </div>
        )}
        {order.deliveryAddress && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[#800080]" />
            <span className="text-[#7851A9]">Delivery Address: </span>
            <span className="font-medium">{order.deliveryAddress}</span>
          </div>
        )}
        {order.server && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-[#800080]" />
            <span className="text-[#7851A9]">Server: </span>
            <span className="font-medium">{order.server}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-[#66023C]">Order Items</h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-start p-3 bg-[#4B0082]/5 rounded-md">
            <div>
              <p className="font-medium">{item.quantity}x {item.name}</p>
              {item.modifiers?.map((mod, i) => (
                <p key={i} className="text-sm text-[#7851A9] ml-4">+ {mod}</p>
              ))}
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="pt-4 border-t border-[#800080]/10">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#66023C]">Total</span>
            <span className="font-semibold text-[#66023C]">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {order.comments && order.comments.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium text-[#66023C]">Comments</h3>
          {order.comments.map((comment, index) => (
            <div key={index} className="p-3 bg-[#4B0082]/5 rounded-md space-y-1">
              <p className="text-sm">{comment.text}</p>
              <div className="flex justify-between items-center text-xs text-[#7851A9]">
                <span>{comment.author}</span>
                <span>{comment.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};