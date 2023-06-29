const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { string } = require("joi");

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

AdminSchema.methods.generateAuthToken = function () {
  const token1 = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWTPRIVATEKEY,
    {
      expiresIn: "7d",
    }
  );
  return token1;
};
const Admin = mongoose.model("admin", AdminSchema);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Admin, validate };
