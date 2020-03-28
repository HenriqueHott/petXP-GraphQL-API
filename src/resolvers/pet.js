const modelFactory = require("../models/modelFactory");

let Pets = modelFactory("pet");

module.exports = {
  createPet: pet => Pets.create(pet),
  listPets: () => Pets.list(),
  getPetById: petId => Pets.getPetById(petId),
  getPetsByOwner: userId => Pets.getPetsByOwner(userId),
  updatePet: pet => Pets.update(pet),
  deletePet: petId => Pets.delete(petId)
};
