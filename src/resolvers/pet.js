const modelFactory = require("../models/modelFactory");

let Pets = modelFactory("pet");

module.exports = {
  createPet: async (userId, name, type, breed, age, weight = null) =>
    await Pets.create(userId, name, type, breed, age, weight),

  listPets: async () => await Pets.list(),

  getPetById: async petId => await Pets.getPetById(petId),

  getPetsByOwner: async userId => await Pets.getPetsByOwner(userId),

  updatePet: async (userId, name, type, breed, age, weight = null) =>
    await Pets.update(userId, name, type, breed, age, weight),

  deletePet: async petId => await Pets.delete(petId)
};
