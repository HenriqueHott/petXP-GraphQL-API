const knexConfig = require("../database/knexConfig");

class Request {
  knex() {
    return knexConfig.from("requests");
  }

  list() {
    return this.knex().orderBy("reqId", "asc");
  }

  listRequestsByStatus(status) {
    return this.knex()
      .where({ status })
      .orderBy("reqId", "asc");
  }

  getRequestById(reqId) {
    return this.knex()
      .where({ reqId })
      .first();
  }

  async create(request) {
    await this.knex().insert(request);

    return this.knex()
      .orderBy("reqId", "desc")
      .limit(1)
      .first();
  }

  async update({ reqId, status }) {
    const toUpdate = { status };
    if (status === "COMPLETED") toUpdate.completedAt = knexConfig.fn.now();

    await this.knex()
      .where({ reqId })
      .update(toUpdate);

    return this.getRequestById(reqId);
  }

  async delete(reqId) {
    const request = await this.getRequestById(reqId);
    if (!request) throw new Error("Could not find request");

    await this.knex()
      .where({ reqId })
      .del();
    return true;
  }
}

module.exports = Request;
