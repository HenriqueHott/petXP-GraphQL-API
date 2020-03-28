const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  enum RequestStatus {
    PENDING
    CANCELED
    COMPLETED
  }

  type User {
    userId: Int!
    name: String!
    email: String!
    surname: String!
    taxRegistry: String!
    address: String
    createdAt: DateTime!
    updatedAt: DateTime!
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
    createdAt: DateTime!
    updatedAt: DateTime!
    owner: User!
    requests: [Request!]!
  }

  type Request {
    reqId: Int!
    userId: Int!
    petId: Int!
    status: RequestStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    completedAt: DateTime
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
    listRequestsByStatus(status: RequestStatus!): [Request!]!
    getRequestById(reqId: Int!): Request!
  }

  type Mutation {
    # User Mutations
    createUser(
      name: String!
      surname: String!
      email: String!
      password: String!
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
    updateRequest(reqId: Int!, status: RequestStatus!): Request! # change only the status of a request
    deleteRequest(reqId: Int!): Boolean!
  }
`;
