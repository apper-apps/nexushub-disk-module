import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Card className="text-center py-12">
      <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        {message}. Please try again or contact support if the problem persists.
      </p>
      <div className="flex gap-3 justify-center">
        <Button variant="primary" onClick={onRetry}>
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </Button>
        <Button variant="outline">
          <ApperIcon name="MessageCircle" className="w-4 h-4" />
          Contact Support
        </Button>
      </div>
    </Card>
  );
};

export default Error;