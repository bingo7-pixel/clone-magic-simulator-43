import { cn } from "@/lib/utils";

interface OrderStatusProps {
  status: "delayed" | "ontime" | "critical";
  className?: string;
}

const statusConfig = {
  delayed: {
    bg: "bg-status-delayed-bg",
    text: "text-status-delayed-text",
    label: "Delayed",
  },
  ontime: {
    bg: "bg-status-ontime-bg",
    text: "text-status-ontime-text",
    label: "On Time",
  },
  critical: {
    bg: "bg-status-critical-bg",
    text: "text-status-critical-text",
    label: "Critical",
  },
};

export const OrderStatus = ({ status, className }: OrderStatusProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center",
      config.bg,
      config.text,
      className
    )}>
      {config.label}
    </span>
  );
};