import usersData from "@/services/mockData/users.json";

let users = [...usersData];

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));

export const usersService = {
  async getAll() {
    await delay();
    return [...users];
  },

  async getByAddress(address) {
    await delay();
    const user = users.find(item => item.address === address);
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  },

  async create(userData) {
    await delay();
    const newUser = {
      ...userData,
      rating: 0,
      totalSales: 0,
      joinedAt: new Date().toISOString()
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(address, updateData) {
    await delay();
    const index = users.findIndex(item => item.address === address);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = { ...users[index], ...updateData };
    return { ...users[index] };
  },

  async updateRating(address, newRating) {
    await delay();
    const index = users.findIndex(item => item.address === address);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = { ...users[index], rating: newRating };
    return { ...users[index] };
  },

  async incrementSales(address) {
    await delay();
    const index = users.findIndex(item => item.address === address);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = {
      ...users[index],
      totalSales: users[index].totalSales + 1
    };
    return { ...users[index] };
  }
};