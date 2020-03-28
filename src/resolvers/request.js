const modelFactory = require("../models/modelFactory");
let Requests = modelFactory("request");

module.exports = {
  createRequest: request => Requests.create(request),
  listRequests: () => Requests.list(),
  listRequestsByStatus: status => Requests.listRequestsByStatus(status),
  getRequestById: reqId => Requests.getRequestById(reqId),
  updateRequest: request => Requests.update(request),
  deleteRequest: reqId => Requests.delete(reqId)
};
