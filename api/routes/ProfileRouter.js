const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/changePassword", UserController.ChangePassword);
router.post("/edit", UserController.EditProfile);

module.exports = router;
