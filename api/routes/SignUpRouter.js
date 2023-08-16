const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/", UserController.Create);

module.exports = router;
