const petResolvers = require("./pet");
const userResolvers = require("./user");
const requestResolvers = require("./request");
const {
  createUserSchema,
  updateUserSchema,
  createPetSchema,
  updatePetSchema,
  createRequestSchema,
  updateRequestSchema
} = require("../validation");

module.exports = {
  Query: {
    //  User Querys
    listUsers: async () => await userResolvers.listUsers(),
    getUserById: async (parent, { userId }) => {
      return await userResolvers.getUserById(userId);
    },

    // Pet Querys
    listPets: async () => await petResolvers.listPets(),
    getPetById: async (parent, { petId }) => {
      return await petResolvers.getPetById(petId);
    },

    // Requests Querys
    listRequests: async () => await requestResolvers.listRequests(),
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
      await createUserSchema.validate(args);

      return await userResolvers.createUser(args);
    },
    updateUser: async (parent, args) => {
      await updateUserSchema.validate(args);

      return await userResolvers.updateUser(args);
    },
    deleteUser: async (parent, args) => {
      return await userResolvers.deleteUser(args.userId);
    },

    // Pet Mutations
    createPet: async (parent, args) => {
      await createPetSchema.validate(args);

      return await petResolvers.createPet(args);
    },
    updatePet: async (parent, args) => {
      await updatePetSchema.validate(args);

      return await petResolvers.updatePet(args);
    },
    deletePet: async (parent, args) => await petResolvers.deletePet(args.petId),

    // Requests Mutations
    createRequest: async (parent, args) => {
      await createRequestSchema.validate(args);

      return await requestResolvers.createRequest(args);
    },
    updateRequest: async (parent, args) => {
      await updateRequestSchema.validate(args);

      return await requestResolvers.updateRequest(args);
    },
    deleteRequest: async (parent, args) => {
      return await requestResolvers.deleteRequest(args.reqId);
    }
  },

  // DateTime scalar resolver
  DateTime: require("graphql-type-datetime")
};
