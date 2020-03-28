const knexConfig = require("../database/knexConfig");

class Pet {
  knex() {
    return knexConfig.from("pets");
  }

  list() {
    return this.knex();
  }

  getPetById(petId) {
    return this.knex()
      .where({ petId })
      .first();
  }

  getPetsByOwner(userId) {
    return this.knex()
      .where({ userId })
      .first();
  }

  create(pet) {
    return knex
      .from(this.table)
      .insert(pet)
      .returning("*");
  }

  update({ petId, ...pet }) {
    return knex
      .from(this.table)
      .where({ petId })
      .update(pet)
      .returning("*");
  }

  async delete(petId) {
    const pet = await this.knex().where({ petId });
    if (!pet) throw new Error("Could not find pet");

    await knex
      .from(this.table)
      .where({ petId })
      .del();
    return true;
  }
}

module.exports = Pet;
