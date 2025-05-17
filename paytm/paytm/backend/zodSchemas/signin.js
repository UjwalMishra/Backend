const zod = require("zod");

exports.signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});
