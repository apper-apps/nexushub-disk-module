import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProductCard = ({ listing, onViewDetails, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "active": return "success";
      case "pending": return "warning";
      case "sold": return "error";
      default: return "default";
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={listing.images[0] || "/api/placeholder/300/300"}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusVariant(listing.status)}>
            {listing.status}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary">
            {listing.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {listing.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <ApperIcon name="User" className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">{listing.seller}</span>
          <div className="flex items-center gap-1 ml-auto">
            <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-white">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold gradient-text">
              {formatPrice(listing.price)}
            </span>
            <span className="text-sm text-primary ml-1">NXS</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddToCart(listing)}
            disabled={listing.status !== "active"}
          >
            <ApperIcon name="ShoppingCart" className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(listing)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;