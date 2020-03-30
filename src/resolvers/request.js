const modelFactory = require("../models/modelFactory");
const Requests = modelFactory("request");

module.exports = {
  listRequests: () => Requests.list(),
  listRequestsWhere: where => Requests.listWhere(where),
  getRequestById: reqId => Requests.getRequestById(reqId),
  createRequest: request => Requests.create(request),
  updateRequest: request => Requests.update(request),
  deleteRequest: reqId => Requests.delete(reqId)
};
