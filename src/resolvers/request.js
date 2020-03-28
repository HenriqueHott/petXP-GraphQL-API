const modelFactory = require("../models/modelFactory");
let Requests = modelFactory("request");

module.exports = {
  createRequest: async (userId, petId) => await Requests.create(userId, petId),
  listRequests: async () => await Requests.list(),
  listRequestsByStatus: async status => {
    return await Requests.listRequestsByStatus(status);
  },
  getRequestById: async reqId => await Requests.getRequestById(reqId),
  updateRequest: async (reqId, status) => await Requests.update(reqId, status),
  deleteRequest: async reqId => await Requests.delete(reqId)
};
