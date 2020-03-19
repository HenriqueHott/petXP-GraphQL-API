const petResolvers = require("./pet");
const userResolvers = require("./user");
const requestResolvers = require("./request");

module.exports = {
  Query: {
    status: () => "GraphQL server is running correct",
    //  User Querys
    listUsers: userResolvers.listUsers,
    getUserById: (parent, args) => userResolvers.getUserById(args.userId),

    // Pet Querys
    listPets: petResolvers.listPets,
    getPetById: (parent, args) => petResolvers.getPetById(args.petId),
    // Requests Querys
    listRequests: requestResolvers.listRequests,
    listRequestsByUser: (parent, args) =>
      requestResolvers.listRequestsByUser(args.userId),
    listRequestsByPet: (parent, args) =>
      requestResolvers.listRequestsByPet(args.petId),
    listRequestsByStatus: (parent, args) =>
      requestResolvers.listRequestsByStatus(args.status),
    getRequestByid: (parent, args) =>
      requestResolvers.getRequestById(args.reqId)
  },

  Mutation: {
    // User Mutations
    createUser: (parent, args) =>
      userResolvers.createUser(
        args.name,
        args.surname,
        args.email,
        args.taxRegistry,
        args.address
      ),
    updateUser: (parent, args) =>
      userResolvers.updateUser(
        args.userId,
        args.name,
        args.surname,
        args.email,
        args.address
      ),
    deleteUser: (parent, args) => userResolvers.deletUser(args.userId),
    // Pet Mutations
    createPet: (parent, args) =>
      petResolvers.createPet(
        args.userId,
        args.name,
        args.type,
        args.breed,
        args.age,
        args.weight
      ),
    updatePet: (parent, args) =>
      petResolvers.updatePet(
        args.petId,
        args.name,
        args.type,
        args.breed,
        args.age,
        args.weight
      ),
    deletePet: (parent, args) => petResolvers.deletePet(args.petId),
    // Requests Mutations
    createRequest: (parent, args) =>
      requestResolvers.createRequest(args.userId, args.petId),
    updateRequest: (parent, args) =>
      requestResolvers.updateRequest(args.reqId, args.status),
    deleteRequest: (parent, args) => requestResolvers.deleteRequest(args.reqId)
  },

  /**
   * Field Resolvers
   */
  User: {
    pets: (parent, args) => petResolvers.getPetsByOwner(parent.userId),
    requests: (parent, args) =>
      requestResolvers.listRequestsByUser(parent.userId)
  },

  Pet: {
    owner: (parent, args) => userResolvers.getUserById(parent.userId),
    requests: (parent, args) => requestResolvers.listRequestsByPet(parent.petId)
  },

  Request: {
    user: (parent, args) => userResolvers.getUserById(parent.userId),
    pet: (parent, args) => petResolvers.getPetById(parent.petId)
  }
};
