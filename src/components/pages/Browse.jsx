import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProductGrid from "@/components/organisms/ProductGrid";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import ProductModal from "@/components/organisms/ProductModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { listingsService } from "@/services/api/listingsService";

const Browse = ({ onAddToCart, searchQuery }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "Digital Art",
    "Services", 
    "Gaming",
    "DeFi",
    "Virtual Real Estate",
    "Music",
    "Hardware"
  ];

  const loadListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (searchQuery) {
        data = await listingsService.search(searchQuery, selectedCategory);
      } else {
        data = await listingsService.getByCategory(selectedCategory);
      }
      
      // Sort listings
      const sortedData = [...data].sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          default: // newest
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
      
      setListings(sortedData);
    } catch (err) {
      console.error("Error loading listings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, [selectedCategory, searchQuery, sortBy]);

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleAddToCart = (listing) => {
    onAddToCart(listing);
    toast.success(`${listing.title} added to cart!`);
  };

  const handleMakeOffer = (listing) => {
    toast.info("Offer functionality coming soon!");
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          {/* Sort Options */}
          <div className="glass-surface rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="ArrowUpDown" className="w-5 h-5 text-primary" />
              Sort By
            </h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className="w-full justify-start"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : "Browse Marketplace"}
              </h1>
              <p className="text-gray-400">
                {searchQuery || selectedCategory !== "all" 
                  ? `${listings.length} listings found`
                  : "Discover amazing blockchain assets"
                }
              </p>
            </div>
          </div>

          <ProductGrid
            listings={listings}
            loading={loading}
            error={error}
            onRetry={loadListings}
            onViewDetails={handleViewDetails}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={selectedListing}
        onAddToCart={handleAddToCart}
        onMakeOffer={handleMakeOffer}
      />
    </div>
  );
};

export default Browse;