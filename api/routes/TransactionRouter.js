const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transactionController");

router.post("/expense", TransactionController.AddExpense);
router.post("/income", TransactionController.AddIncome);

module.exports = router;
