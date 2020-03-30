const knexConfig = require("../database/knexConfig");

class Pet {
  knex() {
    return knexConfig.from("pets");
  }

  list() {
    return this.knex().orderBy("petId", "asc");
  }

  listByOwner(userId) {
    return this.knex()
      .where({ userId })
      .orderBy("petId", "asc");
  }

  async getPetById(petId) {
    const pet = await this.knex()
      .where({ petId })
      .first();

    if (!pet) throw new Error("Could not find pet");

    return pet;
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
    await this.getPetById(petId);

    await this.knex()
      .where({ petId })
      .del();
    return true;
  }
}

module.exports = Pet;
