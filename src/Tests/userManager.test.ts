import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import { expect, test, describe, beforeEach } from "bun:test";
import testDb from "../databaseTest";

describe("UserManager", () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager(testDb);
  });

  test("should create and get a new user", () => {
    const user = new User(testDb);
    userManager.createUser(user);
    // expect userManager's getUser to return the name of the user we
    // just created when given the user's id
    expect(userManager.getUser(user.id)?.name).toBe(user.name);
  });

  test("should remove a user", () => {
    const user = new User(testDb);
    userManager.createUser(user);
    userManager.removeUser(user.id);
    expect(userManager.getUser(user.id)).toBeNull();
  });

  test("should get a user by their websocket ID", () => {
    const user = new User(testDb);
    user.websocketId = "123";
    userManager.createUser(user);
    expect(userManager.getUserByWebsocketId("123")).toBe(user);
  });
});
