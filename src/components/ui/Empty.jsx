import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  title = "No items found", 
  description = "Try adjusting your search or browse different categories",
  actionText = "Browse All",
  onAction,
  icon = "Search"
}) => {
  return (
    <Card className="text-center py-16">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
        {description}
      </p>
      {onAction && (
        <Button variant="primary" size="lg" onClick={onAction}>
          <ApperIcon name="Sparkles" className="w-5 h-5" />
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export default Empty;