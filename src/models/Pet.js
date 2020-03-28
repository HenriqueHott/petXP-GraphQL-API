const knexConfig = require("../database/knexConfig");

class Pet {
  knex() {
    return knexConfig.from("pets");
  }

  list() {
    return this.knex().orderBy("petId", "asc");
  }

  getPetById(petId) {
    return this.knex()
      .where({ petId })
      .first();
  }

  async create(pet) {
    await this.knex().insert(pet);

    return this.knex()
      .orderBy("petId", "desc")
      .limit(1)
      .first();
  }

  async update({ petId, ...pet }) {
    await this.knex()
      .where({ petId })
      .update(pet);

    return this.getPetById(petId);
  }

  async delete(petId) {
    const pet = await this.getPetById(petId);
    if (!pet) throw new Error("Could not find pet");

    await this.knex()
      .where({ petId })
      .del();
    return true;
  }
}

module.exports = Pet;
