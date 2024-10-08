import { TimerManager } from "../Classes/timerManager";
import { expect, test, describe, beforeEach } from "bun:test";
import testDb from "../databaseTest";

describe("TimerManager", () => {
  let timerManager: TimerManager;

  beforeEach(() => {
    timerManager = new TimerManager(testDb);
  });

  test("should create a new timer", () => {
    const timer = timerManager.createTimer("testOwner");
    expect(timer).toBeDefined();
    expect(timer.owner).toBe("testOwner");
  });

  test("should get a timer", () => {
    const timerId = timerManager.createTimer("testOwner").id;
    const timer = timerManager.getTimer(timerId);
    expect(timer).toBeDefined();
    // we can risk the non-null assertion because we know the timer exists -- we just created it
    expect(timer!.owner).toBe("testOwner");
  });

  test("should return null if timer is not found", () => {
    const timer = timerManager.getTimer("nonExistentId");
    expect(timer).toBeNull();
  });

  test("should start a timer", () => {
    const timer = timerManager.createTimer("testOwner");
    timerManager.startTimer(timer.id);
    const startedTimer = timerManager.getTimer(timer.id);
    expect(startedTimer).toBeDefined();
    expect(startedTimer!.isRunning).toBe(true);
  });

  test("should stop a timer", () => {
    const timer = timerManager.createTimer("testOwner");
    timerManager.startTimer(timer.id);
    timerManager.stopTimer(timer.id);
    const stoppedTimer = timerManager.getTimer(timer.id);
    expect(stoppedTimer).toBeDefined();
    expect(stoppedTimer!.isRunning).toBe(false);
  });

  test("should reset a timer", () => {
    const timer = timerManager.createTimer("testOwner");
    timerManager.startTimer(timer.id);
    timerManager.resetTimer(timer.id);
    const resetTimer = timerManager.getTimer(timer.id);
    expect(resetTimer).toBeDefined();
    expect(resetTimer!.isRunning).toBe(false);
    expect(resetTimer!.duration).toBe(0);
  });

  test("should add a user to a timer", () => {
    const timer = timerManager.createTimer("testOwner");
    timerManager.addUserToTimer(timer.id, "testUser");
    const timerWithUser = timerManager.getTimer(timer.id);
    expect(timerWithUser).toBeDefined();
    expect(timerWithUser!.users).toEqual(["testOwner", "testUser"]);
  });

  test("should remove a user from a timer", () => {
    const timer = timerManager.createTimer("testOwner");
    timerManager.addUserToTimer(timer.id, "testUser");
    timerManager.removeUserFromTimer(timer.id, "testUser");
    const timerWithoutUser = timerManager.getTimer(timer.id);
    expect(timerWithoutUser).toBeDefined();
    expect(timerWithoutUser!.users).toEqual(["testOwner"]);
  });
});
