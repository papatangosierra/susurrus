import { TimerManager } from "../Classes/timerManager";
import { UserInterface } from "../Classes/userInterface";
import { User } from "../Classes/user";
import { ElysiaWS } from "elysia/dist/ws";
import { expect, test, describe, beforeEach, beforeAll } from "bun:test";
import testDb from "../databaseTest";
import { logDb } from "../databaseTest";    

describe("TimerManager", () => {
  let timerManager: TimerManager;
  let owner: UserInterface;
  let user: UserInterface;
  let timerId: string;
  let ws: ElysiaWS<any>; // ElysiaWS is the type for the WebSocket connection
  // (we're not actually testing the WebSocket connection here,
  // but we need to pass it in to the TimerManager methods)
  
  beforeAll(() => {
    timerManager = new TimerManager(testDb, logDb);
    owner = new User(testDb);
    user = new User(testDb);
  });

  test("should create a new timer", () => {
    const timer = timerManager.createTimer(owner, ws);
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
    timerManager.startTimer(timerId, ws);
    const startedTimer = timerManager.getTimer(timerId);
    expect(startedTimer).toBeDefined();
    expect(startedTimer!.startTime).toBeGreaterThan(0);
  });

  test("should reset a timer", () => {
    timerManager.resetTimer(timerId, 60000, ws);
    const resetTimer = timerManager.getTimer(timerId);
    expect(resetTimer).toBeDefined();
    expect(resetTimer!.duration).toBe(60000);
    expect(resetTimer!.startTime).toBe(0);
  });

  test("should rename a timer", () => {
    timerManager.renameTimer(timerId, "New Name", ws);
    const renamedTimer = timerManager.getTimer(timerId);
    expect(renamedTimer).toBeDefined();
    expect(renamedTimer!.name).toBe("New Name");
  });

  test("should add a user to a timer", () => {
    timerManager.addUserToTimer(user, timerId, ws);
    const timerWithUser = timerManager.getTimer(timerId);
    expect(timerWithUser).toBeDefined();
    expect(timerWithUser!.users.length).toBe(2);
    expect(timerWithUser!.users[1].id).toBe(user.id);
    expect(user.timerId).toBe(timerId);
  });

  test("should return the users for a timer", () => {
    const users = timerManager.getUsersForTimer(timerId);
    expect(users.length).toBe(2);
    expect(users[0].id).toBe(owner.id);
    expect(users[1].id).toBe(user.id);
  });

  test("should remove a user from a timer", () => {
    const user = new User(testDb);
    timerManager.addUserToTimer(user, timerId, ws);
    timerManager.removeUserFromTimer(user, timerId, ws);
    const timerWithoutUser = timerManager.getTimer(timerId);
    expect(timerWithoutUser).toBeDefined();
    expect(timerWithoutUser!.users.length).toBe(2); // owner + the user we added in the previous test
    expect(timerWithoutUser!.users[0].id).toBe(owner.id);
  });
});
