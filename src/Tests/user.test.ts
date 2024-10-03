import { User } from "../Classes/user";
import { expect, test, describe, beforeEach } from "bun:test";
import testDb from "../databaseTest";

describe("User", () => {
  let user: User;

  beforeEach(() => {
    user = new User(testDb,"Test User");
  });

  test("should create a new user", () => {
    expect(user).toBeDefined();
    expect(user.name).toBe("Test User");
  });

  test("should update the name of the user", () => {
    user.updateName("New Name");
    expect(user.name).toBe("New Name");
  });

  test("should delete the user", () => {
    user.delete();
    const query = testDb.query(`SELECT * FROM users WHERE id = $id`);
    const result = query.all({
      $id: user.id
    });
    expect(user.deleted).toBe(true);
    expect(result.length).toBe(0);
  });

});
