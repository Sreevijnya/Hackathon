require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admins");
const adduserRoutes = require("./routes/addusers");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// database connection
connection();

//mailer

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

//header token auth
app.use("/api", authRoutes);
//adduser
app.use("/api/adduser", adduserRoutes);
const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
