const yup = require("yup");
const { positiveIntSchema, requiredStringSchema } = require("./shared");

module.exports = {
  createRequestSchema: yup.object().shape({
    userId: positiveIntSchema,
    petId: positiveIntSchema
  }),
  updateRequestSchema: yup.object().shape({
    reqId: positiveIntSchema,
    status: requiredStringSchema
  })
};
