import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import CartSidebar from "@/components/organisms/CartSidebar";
import Browse from "@/components/pages/Browse";
import Sell from "@/components/pages/Sell";
import Orders from "@/components/pages/Orders";
import Dashboard from "@/components/pages/Dashboard";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (listing) => {
    const isAlreadyInCart = cartItems.some(item => item.Id === listing.Id);
    if (!isAlreadyInCart) {
      setCartItems(prev => [...prev, listing]);
    }
  };

  const handleRemoveFromCart = (listingId) => {
    setCartItems(prev => prev.filter(item => item.Id !== listingId));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCheckout = () => {
    // In real app, implement blockchain transaction
    console.log("Processing checkout for items:", cartItems);
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-white font-body">
      <Header
        cartItems={cartItems}
        onSearch={handleSearch}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Browse 
                onAddToCart={handleAddToCart} 
                searchQuery={searchQuery}
              />
            } 
          />
          <Route path="/sell" element={<Sell />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-surface !border !border-primary/20"
      />
    </div>
  );
}

export default App;