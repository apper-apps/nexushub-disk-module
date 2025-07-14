import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import WalletConnect from "@/components/molecules/WalletConnect";
import Badge from "@/components/atoms/Badge";

const Header = ({ cartItems = [], onSearch, onCartOpen }) => {
  const location = useLocation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1250.45);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
  };

  const navigation = [
    { name: "Browse", href: "/", icon: "Search" },
    { name: "Sell", href: "/sell", icon: "Plus" },
    { name: "Orders", href: "/orders", icon: "Package" },
    { name: "Dashboard", href: "/dashboard", icon: "BarChart3" }
  ];

  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text font-display">NexusHub</h1>
              <p className="text-xs text-gray-400">P2P Marketplace</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/20 text-primary"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="md"
              onClick={onCartOpen}
              className="relative"
            >
              <ApperIcon name="ShoppingCart" className="w-5 h-5" />
              {cartItems.length > 0 && (
                <Badge 
                  variant="error" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Button>

            {/* Wallet */}
            <WalletConnect
              isConnected={isWalletConnected}
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
              balance={walletBalance}
            />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden border-t border-white/10 p-4">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;