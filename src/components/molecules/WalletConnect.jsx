import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const WalletConnect = ({ isConnected, onConnect, onDisconnect, balance = 0 }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate connection
    onConnect();
    setIsConnecting(false);
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(balance);
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="glass-surface rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <ApperIcon name="Wallet" className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold gradient-text">
              {formatBalance(balance)} NXS
            </span>
          </div>
        </div>
        <Badge variant="success" className="flex items-center gap-1">
          <ApperIcon name="CheckCircle" className="w-3 h-3" />
          Connected
        </Badge>
        <Button variant="ghost" size="sm" onClick={onDisconnect}>
          <ApperIcon name="LogOut" className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="md"
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <>
          <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <ApperIcon name="Wallet" className="w-4 h-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default WalletConnect;