const modelFactory = require("../models/modelFactory");
const Pets = modelFactory("pet");

module.exports = {
  listPets: () => Pets.list(),
  listPetsByOwner: userId => Pets.listByOwner(userId),
  getPetById: petId => Pets.getPetById(petId),
  createPet: pet => Pets.create(pet),
  updatePet: pet => Pets.update(pet),
  deletePet: petId => Pets.delete(petId)
};
