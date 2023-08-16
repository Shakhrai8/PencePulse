const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserController = {
  Create: async (req, res) => {
    const { email, password, username } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        email,
        password: hashedPassword,
        username,
      });

      await user.save();
      res.status(201).json({ message: "OK" });
    } catch (err) {
      console.error("Error creating user:", err);

      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Bad request" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = UserController;
