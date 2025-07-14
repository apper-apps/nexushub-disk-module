import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="glass-surface rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <ApperIcon name="Filter" className="w-5 h-5 text-primary" />
        Categories
      </h3>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === "all" ? "primary" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange("all")}
          className="w-full justify-start"
        >
          <ApperIcon name="Grid3X3" className="w-4 h-4" />
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="w-full justify-start"
          >
            <ApperIcon name="Tag" className="w-4 h-4" />
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;