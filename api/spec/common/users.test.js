const app = require("../../app");
const request = require("supertest");
require("../mongoDBhelper");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

describe("UserController", () => {
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
  });

  test("creates a new user", async () => {
    const newUser = {
      email: "newuser@example.com",
      password: "newpassword",
      username: "newuser",
    };

    const response = await request(app).post("/signup").send(newUser);

    expect(response.statusCode).toBe(201);

    const createdUser = await User.findOne({ email: newUser.email });
    expect(createdUser).toBeTruthy();
  });

  test("changes user password", async () => {
    const profile = await User.findOne({ email: "test@test.com" });
    const newPassword = "newpassword123";

    const response = await request(app)
      .post("/profile/changePassword")
      .set("Authorization", `Bearer ${token}`)
      .send({
        oldPassword: "12345678",
        newPassword,
        userId: profile._id.toString(),
      });

    expect(response.statusCode).toBe(200);

    const userAfterUpdate = await User.findById(profile._id);
    const passwordMatch = await bcrypt.compare(
      newPassword,
      userAfterUpdate.password
    );
    expect(passwordMatch).toBe(true);
  });

  test("edits user profile", async () => {
    const profile = await User.findOne({ email: "test@test.com" });
    const newUsername = "newusername";

    const response = await request(app)
      .post("/profile/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: newUsername, userId: profile._id.toString() });

    expect(response.statusCode).toBe(200);

    const userAfterUpdate = await User.findById(profile._id);
    expect(userAfterUpdate.username).toBe(newUsername);
  });
});
