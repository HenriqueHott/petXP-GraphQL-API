const yup = require("yup");
const {
  requiredStringSchema,
  stringSchema,
  positiveIntSchema
} = require("./shared");

const localShared = yup.object().shape({
  name: requiredStringSchema,
  surname: requiredStringSchema,
  email: requiredStringSchema.email(),
  address: stringSchema
});

module.exports = {
  createUserSchema: localShared.shape({
    password: yup
      .string()
      .min(6)
      .max(256)
      .required(),
    taxRegistry: yup.string().required() // Não tenho certeza do que é
  }),
  updateUserSchema: localShared.shape({
    userId: positiveIntSchema
  })
};
