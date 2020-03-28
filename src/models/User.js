const knexConfig = require("../database/knexConfig");
const argon = require("argon2");

class User {
  knex() {
    return knexConfig.from("users");
  }

  list() {
    return this.knex();
  }

  async getUserById(userId) {
    const user = await this.knex()
      .where({ userId })
      .first();

    return user;
  }

  async create(user) {
    user.password = await argon.hash(user.password);

    await this.knex().insert(user);

    const newUser = await this.knex()
      .orderBy("userId", "desc")
      .limit(1)
      .first();

    Object.assign(newUser, { pets: [], requests: [] });

    return newUser;
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
