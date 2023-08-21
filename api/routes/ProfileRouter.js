const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/changePassword", UserController.ChangePassword);

module.exports = router;
