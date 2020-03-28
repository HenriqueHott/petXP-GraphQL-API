const modelFactory = require("../models/modelFactory");
let Users = modelFactory("user");

module.exports = {
  listUsers: () => Users.list(),
  getUserById: userId => Users.getUserById(userId),
  createUser: user => Users.create(user),
  updateUser: user => Users.update(user),
  deleteUser: userId => Users.delete(userId)
};
