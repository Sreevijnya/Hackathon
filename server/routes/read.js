const { User } = require("../models/user");
const token = require("./jwt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  // console.log(req.body);
  const { firstName, lastName, email, password, mobile, address, mark } =
    req.body;
  try {
    const preuser = await User.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("this is user is already present");
    } else {
      const adduser = new User({
        firstName,
        lastName,
        email,
        password,
        address,
        mobile,
        mark,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
};

const readUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
};

const readUserid = async (req, res) => {
  const userread = await User.find({ email: req.user.email });
  res.status(200).json(userread);
};

const updateUser = async (req, res) => {
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    mobile: req.body.mobile,
    mark: req.body.mark,
  };
  User.findByIdAndUpdate({ _id: req.params.id }, data)
    .then(() => {
      res.status(201).json({
        data,
        message: "updated",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const deleteUser = async (req, res) => {
  const userid = req.body.userid;
  try {
    User.deleteOne({ _id: userid }).then(() => {
      res.send({ status: "ok", data: "Deleted" });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { readUser, updateUser, deleteUser, readUserid, createUser };
