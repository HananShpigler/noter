const express = require("express");

const User = require("../models/user");
const auth = require("../middlewares/auth");
const { default: mongoose } = require("mongoose");

const router = new express.Router();

//Create User
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token, message: "New Account Created!" });
  } catch (error) {
    if (!user.username) {
      //Checks if username is empty
      res.status(500).send({
        message: "Username can not be empty",
      });
    } else if (error.keyPattern && error.keyPattern.username === 1) {
      //Check if username already exists
      res.status(500).send({ message: "Username already taken" });
    } else if (user.password.length < 8) {
      //Checks if password less than 8 characters
      res.status(500).send({
        message: "Password needs to be more than 8 characters",
      });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
});

//Login User
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send({ message: "Unable to Login" });
  }
});

//Logout User
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send({ message: "Logged Out" });
  } catch (error) {
    res.status(500).send({ message: "Unable to Login" });
  }
});

//Get User Details
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//Delete User
router.delete("/users/delete", auth, async (req, res) => {
  try {
    req.user.remove();
    res.send({ message: "Your account was deleted along with all your data" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
