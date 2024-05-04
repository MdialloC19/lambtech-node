const { validationResult } = require("express-validator");
import User from "../../models/User.js";
// const bcrypt = require("bcryptjs");
// const config = require("config");
// const jwt = require("jsonwebtoken");

exports.postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  console.log(req.body);
  res.send("USER register auth route");

  try {
    let user = await User.findOne({ email });
    //   console.log(user);

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      });
    }

    user = new User({
      name,
      email,
      password,
    });

    // Encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken

    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // jwt.sign(
    //   payload,
    //   config.get("jwtSecret"),
    //   { expiresIn: "5 days" },
    //   (err, token) => {
    //     if (err) throw err;
    //     return res.status(201).json({
    //       token,
    //       sucess: true,
    //       message: "User registered",
    //     });
    //   }
    // );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      sucess: false,
      error: [error.message],
    });
  }
};
