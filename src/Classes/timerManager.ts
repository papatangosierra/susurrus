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
  }

  createTimer(owner: string): TimerInterface {
    const timer = new Timer(owner, this.timerDb);
    this.timers.set(timer.id, timer);
    return timer;
  }
  getTimer(id: string): TimerInterface | null {
    throw new Error("getTimer not implemented.");
  }
  updateTimer(id: string, name: string, duration: number, owner: string, users: string[]): void {
    throw new Error("updateTimer not implemented.");
  }
  deleteTimer(id: string): void {
    throw new Error("deleteTimer not implemented.");
  }
  startTimer(id: string): void {
    throw new Error("startTimer not implemented.");
  }
  stopTimer(id: string): void {
    throw new Error("stopTimer not implemented.");
  }
  resetTimer(id: string): void {
    throw new Error("resetTimer not implemented.");
  }
  isFinished(id: string): boolean {
    throw new Error("isFinished not implemented.");
  }

  addUserToTimer(timerId: string, userId: string): void {
    throw new Error("addUserToTimer not implemented.");
  }
}