const modelFactory = require("../models/modelFactory");
let Requests = modelFactory("request");

module.exports = {
  createRequest: async (userId, petId) => await Requests.create(userId, petId),

  listRequests: async () => await Requests.list(),

  listRequestsByUser: async userId => await Requests.listRequestsByUser(userId),

  listRequestsByPet: async petId => await Requests.listRequestsByPet(petId),

  listRequestsByStatus: async status =>
    await Requests.listRequestsByStatus(status),

  getRequestById: async reqId => await Requests.getRequestById(reqId),

  updateRequest: async (reqId, status) => await Requests.update(reqId, status),

  deleteRequest: async reqId => await Requests.delete(reqId) 
};
