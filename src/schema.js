const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    userId: Int!
    name: String!
    surname: String!
    email: String!
    taxRegistry: String!
    address: String
    createdAt: String!
    updatedAt: String!
    pets: [Pet!]!
    requests: [Request!]!
  }

  type Pet {
    petId: Int!
    userId: Int!
    name: String!
    type: String!
    breed: String!
    age: Int!
    weight: Float
    owner: User!
    requests: [Request!]!
  }

  type Request {
    reqId: ID!
    userId: Int!
    petId: Int!
    status: String!
    createdAt: String!
    finishedAt: String
    user: User!
    pet: Pet!
  }

  type Query {
    # User Querys
    listUsers: [User!]!
    getUserById(userId: Int!): User!

    # Pet Querys
    listPets: [Pet!]!
    getPetById(petId: Int!): Pet!

    # Request Querys
    listRequests: [Request!]!
    listRequestsByUser(userId: Int!): [Request!]!
    listRequestsByPet(petId: Int!): [Request!]!
    listRequestsByStatus(status: String!): [Request!]!
    getRequestById(reqId: Int!): Request!
  }

  type Mutation {
    # User Mutations
    createUser(
      name: String!
      surname: String!
      email: String!
      taxRegistry: String!
      address: String
    ): User!
    updateUser(
      userId: Int!
      name: String!
      surname: String!
      email: String!
      address: String
    ): User!
    deleteUser(userId: Int!): Boolean!

    # Pet Mutations
    createPet(
      userId: Int!
      name: String!
      type: String!
      breed: String!
      age: Int!
      weight: Float
    ): Pet!
    updatePet(
      petId: Int!
      name: String!
      type: String!
      breed: String!
      age: Int!
      weight: Float
    ): Pet!
    deletePet(petId: Int!): Boolean!

    # Request Mutations
    createRequest(userId: Int!, petId: Int!): Request!
    updateRequest(reqId: Int!, status: String!): Request! # change only the status of a request
    deleteRequest(reqId: Int!): Boolean!
  }
`;
