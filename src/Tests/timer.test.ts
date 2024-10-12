// Unit tests for the Timer class

import { Timer } from "../Classes/timer";
import { User } from "../Classes/user";
import { expect, test, describe, beforeEach, afterEach, beforeAll, afterAll } from "bun:test";
import testDb from "../databaseTest";

describe("Timer", () => {
  let timer: Timer;
  let owner: User;

  beforeAll(() => {
    owner = new User(testDb);
    timer = new Timer(testDb, owner);
  });

  afterAll(() => {
    owner.delete();
  });

  test("should create a new timer", () => {
    expect(timer).toBeDefined();
    expect(timer.owner.id).toBe(owner.id);
  });

  test("should set the name of the timer", () => {
    timer.setName("testName");
    expect(timer.name).toBe("testName");
  });

  test("should set the duration of the timer", () => {
    timer.setDurationInMinutes(10);
    expect(timer.duration).toBe(600000);
  });

  test("should add a user to the timer", () => {
    const user = new User(testDb);
    timer.addUser(user);
    expect(timer.users.length).toBe(2);
    expect(timer.users[timer.users.length - 1].id).toBe(user.id);
  });

  test("should remove a user from the timer", () => {
    const user = new User(testDb);
    timer.addUser(user);
    expect(timer.users[timer.users.length - 1].id).toBe(user.id);
    timer.removeUser(user);
    expect(timer.users[timer.users.length - 1].id).not.toBe(user.id);
  });

  test("should start the timer", () => {
    timer.start();
    expect(timer.startTime).toBeGreaterThan(0);
    expect(timer.isRunning).toBe(true);
  });

  test("should stop the timer", () => {
    timer.setDurationInMinutes(10);
    timer.start();
    timer.stop();
    expect(timer.isRunning).toBe(false);
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
      $id: timer.id,
    });
    expect(timer.deleted).toBe(true);
    expect(result.length).toBe(0);
  });
});
