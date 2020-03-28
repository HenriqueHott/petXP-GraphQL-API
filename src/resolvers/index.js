const petResolvers = require("./pet");
const userResolvers = require("./user");
const requestResolvers = require("./request");

module.exports = {
  Query: {
    //  User Querys
    listUsers: async () => await userResolvers.listUsers(),
    getUserById: async (parent, { userId }) => {
      return await await userResolvers.getUserById(userId);
    },

    // Pet Querys
    listPets: async () => await petResolvers.listPets(),
    getPetById: async (parent, { petId }) => {
      return await await petResolvers.getPetById(petId);
    },

    // Requests Querys
    listRequests: async () => await requestResolvers.listRequests(),
    listRequestsByUser: async (parent, { userId }) => {
      return await requestResolvers.listRequestsByUser(userId);
    },
    listRequestsByPet: async (parent, { petId }) => {
      return await requestResolvers.listRequestsByPet(petId);
    },
    listRequestsByStatus: async (parent, { status }) => {
      return await requestResolvers.listRequestsByStatus(status);
    },
    getRequestById: async (parent, { reqId }) => {
      return await requestResolvers.getRequestById(reqId);
    }
  },

  Mutation: {
    // User Mutations
    createUser: async (parent, args) => {
      return await userResolvers.createUser(args);
    },
    updateUser: async (parent, args) => {
      return await userResolvers.updateUser(args);
    },
    deleteUser: async (parent, args) => {
      return await userResolvers.deletUser(args.userId);
    },

    // Pet Mutations
    createPet: async (parent, args) => await petResolvers.createPet(args),
    updatePet: async (parent, args) => await petResolvers.updatePet(args),
    deletePet: async (parent, args) => await petResolvers.deletePet(args.petId),

    // Requests Mutations
    createRequest: async (parent, args) => {
      return await await requestResolvers.createRequest(args);
    },
    updateRequest: async (parent, args) => {
      return await requestResolvers.updateRequest(args);
    },
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
