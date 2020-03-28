const yup = require("yup");

const stringSchema = yup
  .string()
  .min(3)
  .max(256)
  .trim();

module.exports = {
  stringSchema,
  requiredStringSchema: stringSchema.required(),
  positiveIntSchema: yup
    .number()
    .integer()
    .positive()
    .required()
};
