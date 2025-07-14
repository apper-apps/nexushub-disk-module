import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import { listingsService } from "@/services/api/listingsService";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    "Digital Art",
    "Services", 
    "Gaming",
    "DeFi",
    "Virtual Real Estate",
    "Music",
    "Hardware"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Simulate image upload - in real app, upload to cloud storage
    const imageUrls = files.map((file, index) => `/api/placeholder/500/500?${index}`);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setLoading(true);
    try {
      const listingData = {
        ...formData,
        price: parseFloat(formData.price),
        currency: "NXS",
        seller: "CurrentUser", // In real app, get from wallet/auth
        images: formData.images.length > 0 ? formData.images : ["/api/placeholder/500/500"]
      };

      await listingsService.create(listingData);
      toast.success("Listing created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        images: []
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.title || !formData.category)) {
      toast.error("Please fill in title and category");
      return;
    }
    if (currentStep === 2 && !formData.description) {
      toast.error("Please add a description");
      return;
    }
    if (currentStep === 3 && formData.images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: "FileText" },
    { number: 2, title: "Description", icon: "AlignLeft" },
    { number: 3, title: "Images", icon: "Image" },
    { number: 4, title: "Pricing", icon: "DollarSign" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Create New Listing</h1>
        <p className="text-gray-400">List your digital assets on the Nexus marketplace</p>
      </div>

      {/* Progress Steps */}
      <Card className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? "bg-primary border-primary text-black"
                  : "border-gray-600 text-gray-400"
              }`}>
                {currentStep > step.number ? (
                  <ApperIcon name="Check" className="w-5 h-5" />
                ) : (
                  <ApperIcon name={step.icon} className="w-5 h-5" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? "text-white" : "text-gray-400"
                }`}>
                  Step {step.number}
                </p>
                <p className={`text-xs ${
                  currentStep >= step.number ? "text-primary" : "text-gray-500"
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-px mx-4 ${
                  currentStep > step.number ? "bg-primary" : "bg-gray-600"
                }`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter listing title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-lg glass-surface px-3 py-2 text-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-surface text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Description */}
        {currentStep === 2 && (
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Description</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your listing in detail..."
                rows={8}
                className="flex w-full rounded-lg glass-surface px-3 py-2 text-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                Provide a detailed description to help buyers understand your listing
              </p>
            </div>
          </Card>
        )}

        {/* Step 3: Images */}
        {currentStep === 3 && (
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Images</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Images (Max 5) *
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <ApperIcon name="Upload" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">
                    Drop your images here, or{" "}
                    <label className="text-primary cursor-pointer hover:text-primary/80">
                      browse
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">
                    Uploaded Images ({formData.images.length}/5)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ApperIcon name="X" className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 4: Pricing */}
        {currentStep === 4 && (
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Pricing</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price in NXS *
                </label>
                <Input
                  name="price"
                  type="number"
                  step="0.00000001"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  Set a competitive price for your listing
                </p>
              </div>

              {/* Preview */}
              <div className="glass-surface rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Listing Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Title:</span>
                    <span className="text-white">{formData.title || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{formData.category || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="gradient-text font-semibold">
                      {formData.price ? `${formData.price} NXS` : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Images:</span>
                    <span className="text-white">{formData.images.length} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="w-4 h-4" />
                  Create Listing
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Sell;