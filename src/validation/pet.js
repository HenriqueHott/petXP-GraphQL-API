const yup = require("yup");
const { positiveIntSchema, requiredStringSchema } = require("./shared");

const localShared = yup.object().shape({
  name: requiredStringSchema,
  type: requiredStringSchema,
  breed: requiredStringSchema,
  age: positiveIntSchema,
  weight: yup.number()
});

module.exports = {
  createPetSchema: localShared.shape({
    userId: positiveIntSchema
  }),
  updatePetSchema: localShared.shape({
    petId: positiveIntSchema
  })
};
