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
  }
};