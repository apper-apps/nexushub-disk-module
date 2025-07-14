import listingsData from "@/services/mockData/listings.json";

let listings = [...listingsData];

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));

export const listingsService = {
  async getAll() {
    await delay();
    return [...listings];
  },

  async getById(id) {
    await delay();
    const listing = listings.find(item => item.Id === parseInt(id));
    if (!listing) {
      throw new Error("Listing not found");
    }
    return { ...listing };
  },

  async create(listingData) {
    await delay();
    const maxId = listings.length > 0 ? Math.max(...listings.map(item => item.Id)) : 0;
    const newListing = {
      ...listingData,
      Id: maxId + 1,
      status: "active",
      createdAt: new Date().toISOString()
    };
    listings.push(newListing);
    return { ...newListing };
  },

  async update(id, updateData) {
    await delay();
    const index = listings.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Listing not found");
    }
    listings[index] = { ...listings[index], ...updateData };
    return { ...listings[index] };
  },

  async delete(id) {
    await delay();
    const index = listings.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Listing not found");
    }
    listings.splice(index, 1);
    return true;
  },

  async search(query, category = "all") {
    await delay();
    let filteredListings = [...listings];
    
    if (category !== "all") {
      filteredListings = filteredListings.filter(
        listing => listing.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredListings = filteredListings.filter(
        listing =>
          listing.title.toLowerCase().includes(searchTerm) ||
          listing.description.toLowerCase().includes(searchTerm) ||
          listing.seller.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredListings;
  },

  async getByCategory(category) {
    await delay();
    if (category === "all") {
      return [...listings];
    }
    return listings.filter(
      listing => listing.category.toLowerCase() === category.toLowerCase()
    );
  },

  async getBySeller(seller) {
return listings.filter(listing => listing.seller === seller);
  },

  async exportToZip() {
    await delay();
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      // Add listings data to ZIP
      const exportData = {
        listings: [...listings],
        exportDate: new Date().toISOString(),
        totalCount: listings.length
      };
      
      zip.file("listings.json", JSON.stringify(exportData, null, 2));
      
      // Generate and download ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nexus-listings-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error('Failed to export listings');
    }
  }
};