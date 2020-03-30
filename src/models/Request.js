const knexConfig = require("../database/knexConfig");

class Request {
  knex() {
    return knexConfig.from("requests");
  }

  list() {
    return this.knex().orderBy("reqId", "asc");
  }

  listWhere(where) {
    return this.knex()
      .where(where)
      .orderBy("reqId", "asc");
  }

  async getRequestById(reqId) {
    const request = await this.knex()
      .where({ reqId })
      .first();

    if (!request) throw new Error("Could not find request");

    return request;
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
    await this.getRequestById(reqId);

    await this.knex()
      .where({ reqId })
      .del();
    return true;
  }
}

module.exports = Request;
