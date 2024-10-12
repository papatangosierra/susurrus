import { TimerManager } from "../Classes/timerManager";
import { UserInterface } from "../Classes/userInterface";
import { User } from "../Classes/user";
import { expect, test, describe, beforeEach, beforeAll } from "bun:test";
import testDb from "../databaseTest";

describe("TimerManager", () => {
  let timerManager: TimerManager;
  let owner: UserInterface;
  let user: UserInterface;
  let timerId: string;

  beforeAll(() => {
    timerManager = new TimerManager(testDb);
    owner = new User(testDb);
    user = new User(testDb);
  });

  test("should create a new timer", () => {
    const timer = timerManager.createTimer(owner);
    timerId = timer.id; // save the id for later tests
    expect(timer).toBeDefined();
    expect(timer.owner.id).toBe(owner.id);
  });

  test("should get a timer", () => {
    const timer = timerManager.getTimer(timerId);
    expect(timer).toBeDefined();
    // we can risk the non-null assertion because we know the timer exists -- we just created it
    expect(timer!.owner.id).toBe(owner.id);
  });

  test("should return null if timer is not found", () => {
    const timer = timerManager.getTimer("nonExistentId");
    expect(timer).toBeNull();
  });

  test("should start a timer", () => {
    timerManager.startTimer(timerId);
    const startedTimer = timerManager.getTimer(timerId);
    expect(startedTimer).toBeDefined();
    expect(startedTimer!.startTime).toBeGreaterThan(0);
  });

  test("should reset a timer", () => {
    timerManager.resetTimer(timerId);
    const resetTimer = timerManager.getTimer(timerId);
    expect(resetTimer).toBeDefined();
    expect(resetTimer!.duration).toBe(0);
  });

  test("should add a user to a timer", () => {
    timerManager.addUserToTimer(user, timerId);
    const timerWithUser = timerManager.getTimer(timerId);
    expect(timerWithUser).toBeDefined();
    expect(timerWithUser!.users.length).toBe(2);
    expect(timerWithUser!.users[1].id).toBe(user.id);
  });

  test("should return the users for a timer", () => {
    const users = timerManager.getUsersForTimer(timerId);
    expect(users.length).toBe(2);
    expect(users[0].id).toBe(owner.id);
    expect(users[1].id).toBe(user.id);
  });

  test("should remove a user from a timer", () => {
    const user = new User(testDb);
    timerManager.addUserToTimer(user, timerId);
    timerManager.removeUserFromTimer(user, timerId);
    const timerWithoutUser = timerManager.getTimer(timerId);
    expect(timerWithoutUser).toBeDefined();
    expect(timerWithoutUser!.users.length).toBe(2); // owner + the user we added in the previous test
    expect(timerWithoutUser!.users[0].id).toBe(owner.id);
  });
});
