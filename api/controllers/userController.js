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
  ChangePassword: async (req, res) => {
    console.log("ChangePassword endpoint hit");
    const { oldPassword, newPassword, userId } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await user.isValidPassword(oldPassword);

      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      user.password = await bcrypt.hash(newPassword, saltRounds);
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      console.error("Error changing password:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  EditProfile: async (req, res) => {
    const { username, userId } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.username = username;
      await user.save();

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = UserController;
