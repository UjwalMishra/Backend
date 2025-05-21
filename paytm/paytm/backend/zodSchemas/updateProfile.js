const zod = require("zod");

const updateProfileSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

module.exports = { updateProfileSchema };
