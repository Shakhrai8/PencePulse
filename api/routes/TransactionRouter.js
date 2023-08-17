const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transactionController");

router.post("/addExpense", TransactionController.AddExpense);
router.post("/addIncome", TransactionController.AddIncome);
router.get(
  "/getTransactions/:userId",
  TransactionController.GetTransactionsByUserId
);

module.exports = router;
