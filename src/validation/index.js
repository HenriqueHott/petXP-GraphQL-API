const { createUserSchema, updateUserSchema } = require("./user");
const { createPetSchema, updatePetSchema } = require("./pet");
const { createRequestSchema, updateRequestSchema } = require("./request");

module.exports = {
  createUserSchema,
  updateUserSchema,
  createPetSchema,
  updatePetSchema,
  createRequestSchema,
  updateRequestSchema
};
