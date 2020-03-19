const modelFactory = require("../models/modelFactory");
let Users = modelFactory("user");

module.exports = {
  createUser: async (name, surname, email, taxRegistry, address) =>
    await Users.create(name, surname, email, taxRegistry, address),

  updateUser: async (userId, name, surname, email, address) =>
    await Users.update(userId, name, surname, email, address),

  listUsers: async () => await Users.list(),

  getUserById: async userId => await Users.getUserById(userId),

  deletUser: async userId => await Users.delete(userId)
};
