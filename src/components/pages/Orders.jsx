import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import OrderCard from "@/components/molecules/OrderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { ordersService } from "@/services/api/ordersService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [exporting, setExporting] = useState(false);

  const statusFilters = [
    { value: "all", label: "All Orders", icon: "Package" },
    { value: "pending", label: "Pending", icon: "Clock" },
    { value: "confirmed", label: "Confirmed", icon: "CheckCircle" },
    { value: "completed", label: "Completed", icon: "Package" },
    { value: "cancelled", label: "Cancelled", icon: "XCircle" }
  ];

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In real app, filter by current user
      const data = await ordersService.getAll();
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleViewDetails = (order) => {
    console.log("View order details:", order);
// In real app, navigate to order details page or open modal
  };

  const handleExportOrders = async () => {
    try {
      setExporting(true);
      await ordersService.exportToZip();
      toast.success("Orders exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export orders");
    } finally {
      setExporting(false);
    }
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusCounts = () => {
    return statusFilters.reduce((acc, filter) => {
      if (filter.value === "all") {
        acc[filter.value] = orders.length;
      } else {
        acc[filter.value] = orders.filter(order => order.status === filter.value).length;
      }
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadOrders} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">My Orders</h1>
        <p className="text-gray-400">Track your purchases and transaction history</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64">
          <div className="glass-surface rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="Filter" className="w-5 h-5 text-primary" />
              Filter Orders
            </h3>
            <div className="space-y-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterStatus === filter.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterStatus(filter.value)}
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ApperIcon name={filter.icon} className="w-4 h-4" />
                    {filter.label}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {statusCounts[filter.value] || 0}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Order Stats */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Orders:</span>
                  <span className="text-sm font-semibold text-white">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Spent:</span>
                  <span className="text-sm font-semibold gradient-text">
                    {orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)} NXS
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Success Rate:</span>
                  <span className="text-sm font-semibold text-success">
                    {orders.length > 0 
                      ? Math.round((orders.filter(o => o.status === "completed").length / orders.length) * 100)
                      : 0
                    }%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-white">
                {filterStatus === "all" ? "All Orders" : `${statusFilters.find(f => f.value === filterStatus)?.label} Orders`}
              </h2>
              <Badge variant="secondary">
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
              </Badge>
</div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportOrders}
                disabled={exporting || orders.length === 0}
              >
                {exporting ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Download" className="w-4 h-4" />
                    Export
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={loadOrders}>
                <ApperIcon name="RefreshCw" className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <Empty
              title={`No ${filterStatus === "all" ? "" : filterStatus} orders found`}
              description={
                filterStatus === "all"
                  ? "You haven't made any purchases yet. Start browsing the marketplace!"
                  : `You don't have any ${filterStatus} orders at the moment.`
              }
              actionText="Browse Marketplace"
              onAction={() => window.location.href = "/"}
              icon="Package"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.Id}
                  order={order}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;