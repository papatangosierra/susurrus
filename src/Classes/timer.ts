// Timer class

import { ITimer } from "./timerInterface";

export class Timer implements ITimer {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  isRunning: boolean;
  users: string[];
  owner: string;

  constructor(id: string, name: string, duration: number, owner: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.startTime = 0;
    this.isRunning = false;
    this.users = [];
    this.owner = owner;
  }

  // Add a user to the timer
  addUser(userId: string): void {
    this.users.push(userId);
  }

  // Remove a user from the timer
  removeUser(userId: string): void {
    this.users = this.users.filter((user) => user !== userId);
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now();
      const endTime = this.startTime + this.duration * 1000;
      this.duration = Math.floor((endTime - this.startTime) / 1000);
      this.isRunning = true;
      console.log(`Timer ${this.id} started`);
      setTimeout(() => {
        this.stop();
      }, this.duration * 1000);
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      console.log(`Timer ${this.id} stopped`);
    }
  }

  reset() {
    this.duration = 0;
    this.startTime = 0;
    this.isRunning = false;
  }
}