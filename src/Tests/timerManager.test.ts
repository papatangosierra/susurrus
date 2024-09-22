import { TimerManager } from "../Classes/timerManager";
import { expect, test, describe, beforeEach } from "bun:test";
import testDb from "../databaseTest";

describe('TimerManager', () => {
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

  test("should update a timer", () => {
    const timer = timerManager.createTimer("testOwner");
    timerManager.updateTimer(timer.id, "New Timer Name", 20, "New Owner", ["New User"]);
    const updatedTimer = timerManager.getTimer(timer.id);
    expect(updatedTimer).toBeDefined();
    expect(updatedTimer!.name).toBe("New Timer Name");
    expect(updatedTimer!.duration).toBe(20);
    expect(updatedTimer!.owner).toBe("New Owner");
    expect(updatedTimer!.users).toEqual(["New User"]);
  });
});