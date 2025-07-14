import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ProductModal = ({ isOpen, onClose, listing, onAddToCart, onMakeOffer }) => {
  if (!listing) return null;

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-surface rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Product Details</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Images */}
                  <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-xl">
                      <img
                        src={listing.images[0] || "/api/placeholder/500/500"}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant={getStatusVariant(listing.status)}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                    {listing.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {listing.images.slice(1, 5).map((image, index) => (
                          <div key={index} className="aspect-square overflow-hidden rounded-lg">
                            <img
                              src={image || "/api/placeholder/120/120"}
                              alt={`${listing.title} ${index + 2}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <Badge variant="secondary" className="mb-3">
                        {listing.category}
                      </Badge>
                      <h1 className="text-3xl font-bold text-white mb-4">
                        {listing.title}
                      </h1>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl font-bold gradient-text">
                          {formatPrice(listing.price)} NXS
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-white font-semibold">4.8</span>
                          <span className="text-gray-400">(124 reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="glass-surface rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Seller Information</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <ApperIcon name="User" className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{listing.seller}</p>
                          <div className="flex items-center gap-1">
                            <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-400">4.8 • 156 sales</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          View Profile
                        </Button>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {listing.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => onAddToCart(listing)}
                        disabled={listing.status !== "active"}
                      >
                        <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                        Add to Cart
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          size="md"
                          onClick={() => onMakeOffer(listing)}
                          disabled={listing.status !== "active"}
                        >
                          <ApperIcon name="MessageCircle" className="w-4 h-4" />
                          Make Offer
                        </Button>
                        <Button variant="ghost" size="md">
                          <ApperIcon name="Heart" className="w-4 h-4" />
                          Save
                        </Button>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="glass-surface rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Trust & Security</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                          <span className="text-sm text-gray-300">Escrow Protection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ApperIcon name="Clock" className="w-4 h-4 text-primary" />
                          <span className="text-sm text-gray-300">24h Dispute Resolution</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ApperIcon name="CheckCircle" className="w-4 h-4 text-success" />
                          <span className="text-sm text-gray-300">Verified Seller</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;