const Transaction = require("../models/transaction");

const TransactionController = {
  AddExpense: async (req, res) => {
    try {
      const { userId, title, amount, category } = req.body;

      const expense = new Transaction({
        userId,
        title,
        amount,
        type: "expense",
        category: category || "Others",
      });

      await expense.save();

      res.status(201).json({ message: "Expense added successfully", expense });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  AddIncome: async (req, res) => {
    try {
      const { userId, title, amount, category } = req.body;

      const income = new Transaction({
        userId,
        title,
        amount,
        type: "income",
        category: category || "Others",
      });

      await income.save();

      res.status(201).json({ message: "Income added successfully", income });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  GetTransactionsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId; 

      const transactions = await Transaction.find({ userId });

      res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },
};

module.exports = TransactionController;
