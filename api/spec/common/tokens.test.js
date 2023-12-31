const app = require("../../app");
const request = require("supertest");
require("../mongoDBhelper");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("/tokens", () => {
  let user;

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    user = new User({
      email: "test@test.com",
      password: hashedPassword,
      username: "test",
    });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("a token is returned when creds are valid", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: user.email, password: "12345678" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("a token is not returned when creds have invalid password", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: user.email, password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error password mismatch");
  });

  test("a token is not returned when creds have invalid email", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: "something", password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error user not found");
  });

  test("it returns 500 if there is an error retrieving user from the database", async () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    jest.spyOn(User, "findOne").mockImplementationOnce(() => {
      return Promise.reject(new Error("Test error"));
    });

    let response = await request(app)
      .post("/login")
      .send({ email: user.email, password: "12345678" });

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual("Internal server error");

    console.error = originalConsoleError;
    jest.restoreAllMocks();
  });
});
