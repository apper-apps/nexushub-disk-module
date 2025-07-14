import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
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

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass-surface border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="ShoppingCart" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 mb-4">Add some items to get started</p>
                  <Button variant="primary" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.Id} className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={item.images[0] || "/api/placeholder/80/80"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-400 mb-2">{item.seller}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold gradient-text">
                              {formatPrice(item.price)} NXS
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.Id)}
                              className="text-error hover:text-error"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-2xl font-bold gradient-text">
                    {formatPrice(totalAmount)} NXS
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={onCheckout}
                >
                  <ApperIcon name="CreditCard" className="w-5 h-5" />
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;