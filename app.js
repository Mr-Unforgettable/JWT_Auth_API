require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());

// Register
app.post("/register", async (req, res) => {
  // our register logic goes here...
  try {
    // Get user Input.
    const { first_name, last_name, email, password } = req.body;

    // Validate user input.
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required.");
    }
    if (typeof email !== "string") {
      return res.status(400).send("Invalid email format.");
    }

    // Check if user already exist.
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exist. Please Login.");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // Save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  // our login logic goes here
  try {
    // Get user input.
    const { email, password } = req.body;

    // Validate user input.
    if (!(email && password)) {
      return res.status(400).send("All input is required.");
    }

    // Validate if user exist in our database.
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token.
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Save user token.
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      return res.status(400).send("Invalid Credentials.");
    }
  } catch (err) {
    console.log(err);
  }
});

// Welcome
app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined in this server",
    },
  });
});

module.exports = app;
