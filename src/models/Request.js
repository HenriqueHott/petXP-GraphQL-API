const knexConfig = require("../database/knexConfig");

class Request {
  knex() {
    return knexConfig.from("requests");
  }

  list() {
    return this.knex();
  }

  listRequestsByUser(userId) {
    return this.knex()
      .where({ userId })
      .first();
  }

  listRequestsByPet(petId) {
    return this.knex()
      .where({ petId })
      .first();
  }

  listRequestsByStatus(status) {
    return this.knex().where({ status });
  }

  getRequestById(reqId) {
    return this.knex()
      .where({ reqId })
      .first();
  }

  create(request) {
    return knex
      .from(this.table)
      .insert(request)
      .returning("*");
  }

  update({ reqId, status }) {
    return knex
      .from(this.table)
      .where({ reqId })
      .update(status)
      .returning("*");
  }

  async delete(reqId) {
    const request = await this.knex().where({ reqId });
    if (!request) throw new Error("Could not find request");

    await knex
      .from(this.table)
      .where({ reqId })
      .del();
    return true;
  }
}

module.exports = Request;
