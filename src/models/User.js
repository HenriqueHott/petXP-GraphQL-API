const knexConfig = require("../database/knexConfig");

class User {
  knex() {
    return knexConfig.from("users");
  }

  list() {
    return this.knex();
  }

  getUserById(userId) {
    return this.knex()
      .where({ userId })
      .first();
  }

  async create(user) {
    await this.knex().insert(user);

    return this.knex()
      .orderBy("userId", "desc")
      .limit(1)
      .first();
  }

  async update({ userId, ...user }) {
    await this.knex()
      .where({ userId })
      .update(user);

    return this.getUserById(userId);
  }

  async delete(userId) {
    const user = await this.getUserById(userId);
    if (!user) throw new Error("Could not find user");

    await this.knex()
      .where({ userId })
      .del();
    return true;
  }
}

module.exports = User;
