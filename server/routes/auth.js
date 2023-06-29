const router = require("express").Router();
const { User } = require("../models/user");
const { Admin } = require("../models/admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const {
  readUser,
  updateUser,
  deleteUser,
  readUserid,
  createUser,
} = require("./read");
const { tokenAuth } = require("./jwt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server " });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token1 = admin.generateAuthToken();
    res.status(200).send({ data: token1, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// const tokenAuth = (req, res, next) => {
//   const headerauth = req.headers["authorization"];
//   const token = headerauth && headerauth.split(" ")[1];
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };
router.post("/create", createUser);

router.get("/read", readUser);

router.put("/update/:id", updateUser);

router.post("/delete", deleteUser);

router.get("/readuser", tokenAuth, readUserid);

router.get("/verify", tokenAuth, (req, res) => {
  console.log(req.user.email);
  res.json({ email: req.user.email, _id: req.user._id });
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
