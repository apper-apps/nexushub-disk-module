import ordersData from "@/services/mockData/orders.json";

let orders = [...ordersData];

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));

export const ordersService = {
  async getAll() {
    await delay();
    return [...orders];
  },

  async getById(id) {
    await delay();
    const order = orders.find(item => item.Id === parseInt(id));
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  },

  async create(orderData) {
    await delay();
    const maxId = orders.length > 0 ? Math.max(...orders.map(item => item.Id)) : 0;
    const newOrder = {
      ...orderData,
      Id: maxId + 1,
      status: "pending",
      txHash: null,
      timestamp: new Date().toISOString()
    };
    orders.push(newOrder);
    return { ...newOrder };
  },

  async update(id, updateData) {
    await delay();
    const index = orders.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    orders[index] = { ...orders[index], ...updateData };
    return { ...orders[index] };
  },

  async delete(id) {
    await delay();
    const index = orders.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    orders.splice(index, 1);
    return true;
  },

  async getByBuyer(buyer) {
    await delay();
    return orders.filter(order => order.buyer === buyer);
  },

  async getBySeller(seller) {
    await delay();
    return orders.filter(order => order.seller === seller);
  },

  async confirmOrder(id, txHash) {
    await delay();
    const index = orders.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    orders[index] = {
      ...orders[index],
      status: "confirmed",
      txHash: txHash
    };
    return { ...orders[index] };
  },

  async completeOrder(id) {
    await delay();
    const index = orders.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    orders[index] = {
      ...orders[index],
      status: "completed"
};
    return { ...orders[index] };
  },

  async exportToZip() {
    await delay();
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      // Add orders data to ZIP
      const exportData = {
        orders: [...orders],
        exportDate: new Date().toISOString(),
        totalCount: orders.length
      };
      
      zip.file("orders.json", JSON.stringify(exportData, null, 2));
      
      // Generate and download ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nexus-orders-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error('Failed to export orders');
    }
  }
};