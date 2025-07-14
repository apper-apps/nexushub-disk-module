import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const OrderCard = ({ order, onViewDetails }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return "Clock";
      case "confirmed": return "CheckCircle";
      case "completed": return "Package";
      case "cancelled": return "XCircle";
      default: return "Circle";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending": return "warning";
      case "confirmed": return "default";
      case "completed": return "success";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Order #{order.Id.toString().padStart(6, "0")}
          </h3>
          <p className="text-sm text-gray-400">
            {format(new Date(order.timestamp), "MMM dd, yyyy 'at' HH:mm")}
          </p>
        </div>
        <Badge variant={getStatusVariant(order.status)}>
          <ApperIcon name={getStatusIcon(order.status)} className="w-3 h-3 mr-1" />
          {order.status}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Seller:</span>
          <span className="text-sm text-white">{order.seller}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Amount:</span>
          <span className="text-lg font-semibold gradient-text">
            {formatPrice(order.amount)} NXS
          </span>
        </div>
        {order.txHash && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Transaction:</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-mono">
                {order.txHash.slice(0, 8)}...{order.txHash.slice(-8)}
              </span>
              <Button variant="ghost" size="sm">
                <ApperIcon name="ExternalLink" className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => onViewDetails(order)}
      >
        View Details
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
      </Button>
    </Card>
  );
};

export default OrderCard;