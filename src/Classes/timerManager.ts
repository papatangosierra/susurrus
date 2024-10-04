import { TimerManagerInterface } from "./timerManagerInterface";
import { TimerInterface } from "./timerInterface";
import { Timer } from "./timer";
import { Database } from 'bun:sqlite';
import db from "../database";

export class TimerManager implements TimerManagerInterface {
  private timers: Map<string, TimerInterface>;
  private timerDb: Database;

  constructor(db: Database) {
    this.timers = new Map();
    this.timerDb = db;
    // Load all timers from the database
    // const timers = this.timerDb.query("SELECT * FROM timers").all();
    // console.log(timers);
    // for (const timer of timers) {
    //   this.timers.set(timer.id, timer);
    // }
  }

  createTimer(owner: string): TimerInterface {
    const timer = new Timer(owner, this.timerDb);
    this.timers.set(timer.id, timer);
    return timer;
  }

  getTimer(id: string): TimerInterface | null {
    return this.timers.get(id) || null;
  }


  deleteTimer(id: string): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.delete();
      this.timers.delete(id);
    } else {
      throw new Error("Timer not found");
    }
  }

  startTimer(id: string): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.start();
    } else {
      throw new Error("Timer not found");
    }
  }

  stopTimer(id: string): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.stop();
    } else {
      throw new Error("Timer not found");
    }
  }

  resetTimer(id: string, duration?: number): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.reset();
    } else {
      throw new Error("Timer not found");
    }
  }

  isFinished(id: string): boolean {
    const timer = this.getTimer(id);
    if (timer) {
      return timer.isFinished();
    } else {
      throw new Error("Timer not found");
    }
  }

  addUserToTimer(timerId: string, userId: string): void {
    const timer = this.getTimer(timerId);
    if (timer) {
      timer.addUser(userId);
    } else {
      throw new Error("Timer not found");
    }
  }

  removeUserFromTimer(timerId: string, userId: string): void {
    const timer = this.getTimer(timerId);
    if (timer) {
      timer.removeUser(userId);
    } else {
      throw new Error("Timer not found");
    }
  }
}