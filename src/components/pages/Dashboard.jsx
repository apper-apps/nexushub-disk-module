import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { listingsService } from "@/services/api/listingsService";
import { ordersService } from "@/services/api/ordersService";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In real app, filter by current seller
      const [listingsData, salesData] = await Promise.all([
        listingsService.getBySeller("CurrentUser"),
        ordersService.getBySeller("CurrentUser")
      ]);
      
      setListings(listingsData);
      setSales(salesData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getStats = () => {
    const totalListings = listings.length;
    const activeListings = listings.filter(l => l.status === "active").length;
    const totalSales = sales.filter(s => s.status === "completed").length;
    const totalRevenue = sales
      .filter(s => s.status === "completed")
      .reduce((sum, sale) => sum + sale.amount, 0);
    const pendingOrders = sales.filter(s => s.status === "pending").length;

    return {
      totalListings,
      activeListings,
      totalSales,
      totalRevenue,
      pendingOrders
    };
  };

  const stats = getStats();

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "listings", label: "My Listings", icon: "Package" },
    { id: "sales", label: "Sales History", icon: "TrendingUp" }
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Seller Dashboard</h1>
        <p className="text-gray-400">Manage your listings and track your sales performance</p>
      </div>

      {/* Tab Navigation */}
      <div className="glass-surface rounded-xl p-1 mb-8 inline-flex">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <ApperIcon name={tab.icon} className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Package" className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalListings}</h3>
              <p className="text-sm text-gray-400">Total Listings</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.activeListings}</h3>
              <p className="text-sm text-gray-400">Active Listings</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalSales}</h3>
              <p className="text-sm text-gray-400">Total Sales</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="DollarSign" className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold gradient-text mb-1">
                {stats.totalRevenue.toFixed(2)}
              </h3>
              <p className="text-sm text-gray-400">Revenue (NXS)</p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Clock" className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.pendingOrders}</h3>
              <p className="text-sm text-gray-400">Pending Orders</p>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="primary" size="lg" className="h-20 flex-col">
                <ApperIcon name="Plus" className="w-6 h-6 mb-2" />
                Create New Listing
              </Button>
              <Button variant="outline" size="lg" className="h-20 flex-col">
                <ApperIcon name="BarChart3" className="w-6 h-6 mb-2" />
                View Analytics
              </Button>
              <Button variant="outline" size="lg" className="h-20 flex-col">
                <ApperIcon name="Settings" className="w-6 h-6 mb-2" />
                Account Settings
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <ApperIcon name="Package" className="w-5 h-5 text-primary" />
                Recent Listings
              </h3>
              {listings.slice(0, 3).length > 0 ? (
                <div className="space-y-4">
                  {listings.slice(0, 3).map((listing) => (
                    <div key={listing.Id} className="flex items-center gap-3 p-3 glass-surface rounded-lg">
                      <img
                        src={listing.images[0] || "/api/placeholder/60/60"}
                        alt={listing.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-white line-clamp-1">{listing.title}</h4>
                        <p className="text-sm text-gray-400">{listing.price} NXS</p>
                      </div>
                      <Badge variant={listing.status === "active" ? "success" : "warning"}>
                        {listing.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="Package" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No listings yet</p>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <ApperIcon name="TrendingUp" className="w-5 h-5 text-accent" />
                Recent Sales
              </h3>
              {sales.slice(0, 3).length > 0 ? (
                <div className="space-y-4">
                  {sales.slice(0, 3).map((sale) => (
                    <div key={sale.Id} className="flex items-center justify-between p-3 glass-surface rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Order #{sale.Id.toString().padStart(6, "0")}</h4>
                        <p className="text-sm text-gray-400">{sale.buyer.slice(0, 8)}...{sale.buyer.slice(-8)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold gradient-text">{sale.amount} NXS</p>
                        <Badge variant={
                          sale.status === "completed" ? "success" :
                          sale.status === "pending" ? "warning" : "default"
                        }>
                          {sale.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="TrendingUp" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No sales yet</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Listings Tab */}
      {activeTab === "listings" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">My Listings</h2>
            <Button variant="primary">
              <ApperIcon name="Plus" className="w-4 h-4" />
              Create Listing
            </Button>
          </div>

          {listings.length === 0 ? (
            <Empty
              title="No listings yet"
              description="Create your first listing to start selling on the marketplace"
              actionText="Create Listing"
              onAction={() => window.location.href = "/sell"}
              icon="Package"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.Id} className="p-0 overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={listing.images[0] || "/api/placeholder/300/300"}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={listing.status === "active" ? "success" : "warning"}>
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{listing.title}</h3>
                    <p className="text-lg font-bold gradient-text mb-3">{listing.price} NXS</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ApperIcon name="Edit" className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sales Tab */}
      {activeTab === "sales" && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Sales History</h2>
          
          {sales.length === 0 ? (
            <Empty
              title="No sales yet"
              description="Your sales will appear here once customers start purchasing your listings"
              icon="TrendingUp"
            />
          ) : (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Buyer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.Id} className="border-b border-white/5">
                        <td className="py-3 px-4 text-sm text-white">
                          #{sale.Id.toString().padStart(6, "0")}
                        </td>
                        <td className="py-3 px-4 text-sm text-white font-mono">
                          {sale.buyer.slice(0, 8)}...{sale.buyer.slice(-8)}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold gradient-text">
                          {sale.amount} NXS
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            sale.status === "completed" ? "success" :
                            sale.status === "pending" ? "warning" : "default"
                          }>
                            {sale.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {new Date(sale.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;