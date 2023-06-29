const jwt = require("jsonwebtoken");
require("dotenv").config();

// const tokenAuth = (req, res, next) => {
//   try {
//     const headerauth = req.headers["authorization"];
//     if (headerauth) {
//       const token = headerauth && headerauth.split(" ")[1];
//       jwt.verify(token, process.env.JWTPRIVATEKEY);
//       req.userId = user.id;
//     } else {
//       res.status(401).json({ message: "Unauthorized user" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ message: "Unauthorized user" });
//   }
// };
const tokenAuth = (req, res, next) => {
  const headerauth = req.headers["authorization"];
  const token = headerauth && headerauth.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = { tokenAuth };
