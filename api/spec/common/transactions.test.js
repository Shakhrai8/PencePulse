const app = require("../../app");
const request = require("supertest");
require("../mongoDBhelper");
const User = require("../../models/user");
const Transaction = require("../../models/transaction");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

describe("TransactionController", () => {
  let token;

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("12345678", 10);
    const user = new User({
      email: "test@test.com",
      password: hashedPassword,
      username: "test",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Transaction.deleteMany({});
  });

  test("adds an expense transaction", async () => {
    const profile = await User.findOne({ email: "test@test.com" });
    const expenseData = {
      userId: profile._id,
      title: "Groceries",
      amount: 50,
      category: "Food",
    };

    const response = await request(app)
      .post("/transaction/addExpense")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Expense added successfully");
    expect(response.body.expense).toBeTruthy();

    const createdExpense = await Transaction.findById(
      response.body.expense._id
    );
    expect(createdExpense).toBeTruthy();
    expect(createdExpense.type).toBe("expense");
    expect(createdExpense.title).toBe(expenseData.title);
    expect(createdExpense.amount).toBe(expenseData.amount);
    expect(createdExpense.category).toBe(expenseData.category);
  });

  test("adds an income transaction", async () => {
    const profile = await User.findOne({ email: "test@test.com" });
    const incomeData = {
      userId: profile._id,
      title: "Salary",
      amount: 5000,
      category: "Income",
    };

    const response = await request(app)
      .post("/transaction/addIncome")
      .set("Authorization", `Bearer ${token}`)
      .send(incomeData);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Income added successfully");
    expect(response.body.income).toBeTruthy();

    const createdIncome = await Transaction.findById(response.body.income._id);
    expect(createdIncome).toBeTruthy();
    expect(createdIncome.type).toBe("income");
    expect(createdIncome.title).toBe(incomeData.title);
    expect(createdIncome.amount).toBe(incomeData.amount);
    expect(createdIncome.category).toBe(incomeData.category);
  });

  test("gets transactions by user ID", async () => {
    const profile = await User.findOne({ email: "test@test.com" });
    const expenseData = {
      userId: profile._id,
      title: "Groceries",
      amount: 50,
      category: "Food",
    };

    const response = await request(app)
      .post("/transaction/addExpense")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseData);

    const transactionsResponse = await request(app)
      .get(`/transaction/getTransactions/${profile._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(transactionsResponse.statusCode).toBe(200);
    expect(transactionsResponse.body.length).toBe(1);
    const transaction = transactionsResponse.body[0];
    expect(transaction.title).toBe(expenseData.title);
    expect(transaction.amount).toBe(expenseData.amount);
    expect(transaction.category).toBe(expenseData.category);
  });
});
