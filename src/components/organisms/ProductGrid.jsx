import React from "react";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ 
  listings, 
  loading, 
  error, 
  onRetry, 
  onViewDetails, 
  onAddToCart 
}) => {
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={onRetry} />;
  if (!listings || listings.length === 0) {
    return <Empty 
      title="No listings found"
      description="Try adjusting your search or browse different categories"
      actionText="Browse All Categories"
      onAction={() => window.location.href = "/"}
    />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ProductCard
          key={listing.Id}
          listing={listing}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;