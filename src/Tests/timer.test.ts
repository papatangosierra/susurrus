// Unit tests for the Timer class

import { Timer } from "../Classes/timer";
import { expect, test, describe, beforeEach } from "bun:test";
import testDb from "../databaseTest";

describe("Timer", () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer("testOwner", testDb);
  });

  test("should create a new timer", () => {
    expect(timer).toBeDefined();
    expect(timer.owner).toBe("testOwner");
  });

  test("should set the name of the timer", () => {
    timer.setName("testName");
    expect(timer.name).toBe("testName");
  });

  test("should set the duration of the timer", () => {
    timer.setDurationInMinutes(1000);
    expect(timer.duration).toBe(1000);
  });

  test("should add a user to the timer", () => {
    timer.addUser("testUser");
    expect(timer.users).toContain("testUser");
  });

  test("should remove a user from the timer", () => {
    timer.addUser("testUser");
    timer.removeUser("testUser");
    expect(timer.users).not.toContain("testUser");
  });

  test("should start the timer", () => {
    timer.start();
    expect(timer.isRunning).toBe(true);
  });

  test("should stop the timer", () => {
    timer.setDurationInMinutes(5000);
    timer.start();
    timer.stop();
    expect(timer.isRunning).toBe(false);
    expect(timer.duration).toBeLessThan(5000);
  });

  test("should reset the timer", () => {
    timer.start();
    timer.stop();
    timer.reset();
    expect(timer.duration).toBe(0);
    expect(timer.isRunning).toBe(false);
  });

  test("should check if the timer is finished", () => {
    timer.setDurationInMinutes(0);
    timer.start();
    expect(timer.isFinished()).toBe(true);
  });

  test("should delete the timer", () => {
    timer.delete();
    const query = testDb.query(`SELECT * FROM timers WHERE id = $id`);
    const result = query.all({
      $id: timer.id
    });
    expect(timer.deleted).toBe(true);
    expect(result.length).toBe(0);
  });
});
