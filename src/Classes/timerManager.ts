import { TimerManagerInterface } from "./timerManagerInterface";
import { TimerInterface } from "./timerInterface";
import { UserInterface } from "./userInterface";
import { Timer } from "./timer";
import { ElysiaWS } from "elysia/dist/ws";
import { EventEmitter } from "events";
import { Database } from "bun:sqlite";

export class TimerManager extends EventEmitter implements TimerManagerInterface {
  private timers: Map<string, TimerInterface>;
  private timerDb: Database;

  constructor(db: Database) {
    super();
    this.timers = new Map();
    this.timerDb = db;
    this.loadTimersFromDatabase();
  }

  createTimer(owner: UserInterface, ws: ElysiaWS<any, any, any>): TimerInterface {
    const timer = new Timer(this.timerDb, owner);
    this.timers.set(timer.id, timer);
    ws.subscribe(timer.id);
    this.emit("timerCreated", {timer, ws});
    return timer;
  }

  getTimer(id: string): TimerInterface | null {
    return this.timers.get(id) || null;
  }

  deleteTimer(id: string, ws: ElysiaWS<any, any, any>): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.delete();
      this.timers.delete(id);
      this.emit("timerDeleted", {timer, ws});
    } else {
      throw new Error("Timer not found");
    }
  }

  startTimer(id: string, ws: ElysiaWS<any, any, any>): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.start();
    } else {
      throw new Error("Timer not found");
    }
  }

  resetTimer(id: string, duration: number, ws: ElysiaWS<any, any, any>): void {
    const timer = this.getTimer(id);
    if (timer) {
      timer.reset(duration);
      this.emit("timerReset", {timer, ws});
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

  getUsersForTimer(id: string): UserInterface[] {
    const timer = this.getTimer(id);
    if (timer) {
      return timer.users;
    } else {
      throw new Error("Timer not found");
    }
  }

  // purgeStaleTimers(): number {
  // // Iterate over the timers and delete any that are more than 12 hours old
  // const cutoff = Date.now() - (12 * 60 * 60 * 1000);
  // let deletedCount = 0;
  // for (const timer of this.timers) {
  //   if (timer.startTime < cutoff) {
  //     console.log(`Purging stale timer ${timer.id}`);
  //     this.deleteTimer(timer.id);
  //     deletedCount++;
  //   }
  // }
  //   // Return the number of timers deleted
  //   return deletedCount;
  // }

  addUserToTimer(user: UserInterface, timerId: string, ws: ElysiaWS<any, any, any>): void {
    const timer = this.getTimer(timerId);
    if (timer) {
      timer.addUser(user);
      user.timerId = timerId;
      ws.subscribe(timerId);
      this.emit("userAddedToTimer", {user, timer, ws});
    } else {
      throw new Error("Timer not found");
    }
  }

  removeUserFromTimer(user: UserInterface, timerId: string, ws: ElysiaWS<any, any, any>): void {
    const timer = this.getTimer(timerId);
    console.log("removing user from timer: ", timerId);
    if (timer) {
      timer.removeUser(user);
      ws.unsubscribe(timerId);
      this.emit("userRemovedFromTimer", {user, timer, ws});
    } else {
      throw new Error("Timer not found");
    }
  }

  private loadTimersFromDatabase(): void {
    const timers = this.timerDb.query("SELECT * FROM timers").all();
    // console.log(timers);
    for (const timer of timers as TimerInterface[]) {
      const newTimer = new Timer(this.timerDb, timer.owner, timer.id);
      this.timers.set(timer.id, newTimer);
    }
  }
}
