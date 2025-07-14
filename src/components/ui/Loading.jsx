import React from "react";
import Card from "@/components/atoms/Card";

const Loading = () => {
  const SkeletonCard = () => (
    <Card className="p-0 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>
        <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gradient-to-r from-primary/30 to-accent/30 rounded w-20"></div>
          <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-16"></div>
        </div>
        <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-32 animate-pulse"></div>
        <div className="h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;