// Timer class

import { TimerInterface } from "./timerInterface";
import { Database } from 'bun:sqlite';

export class Timer implements TimerInterface {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  isRunning: boolean;
  users: string[];
  owner: string;

  private timerDb: Database;

  constructor(owner: string, db: Database) {
    this.id = this.createId();
    this.name = "Your timer";
    this.startTime = 0;
    this.duration = 0;
    this.isRunning = false;
    this.users = [owner];
    this.owner = owner;
    this.timerDb = db;
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(Date.now().toString() + Math.random().toString());
    this.id = hasher.digest("hex");
    this.create(); // Create the timer in the database
  }

  setName(name: string): void {
    this.name = name;
  }

  setDuration(duration: number): void { 
    this.duration = duration;
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
    this.startTime = Date.now();
    this.isRunning = true;
    this.save();
    console.log(`Timer ${this.id} started at ${this.startTime}`);
  }

  stop() {
    if (this.startTime) {
      this.duration = Date.now() - this.startTime;
      this.isRunning = false;
      this.save();
    } else {
      console.error('Timer was not started');
    }
  }

  reset() {
    this.duration = 0;
    this.startTime = 0;
    this.isRunning = false;
    this.save();
  }

  isFinished(): boolean {
    if (!this.isRunning) return false;
    const currentTime = Date.now();
    // if the difference between 
    // the current time and the start time is greater than 
    // or equal to the duration, the timer is finished
    return currentTime - this.startTime >= this.duration; 
  }

  private createId(): string {
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(Date.now().toString() + Math.random().toString() + this.owner);
    return hasher.digest("hex");
  }

  private create() {
    const usersJson = JSON.stringify(this.users);
    const query = this.timerDb.query(`INSERT INTO timers (id, name, duration, startTime, isRunning, owner, users) VALUES ($id, $name, $duration, $startTime, $isRunning, $owner, $users)`);
    try {
      query.all({
        $id: this.id,
        $name: this.name,
        $duration: this.duration,
        $startTime: this.startTime,
        $isRunning: this.isRunning,
        $users: usersJson
      });
    } catch (error) {
      console.error('Error creating timer in database: ', error);
    }
  }

  private save() {
    const usersJson = JSON.stringify(this.users);
    const query = this.timerDb.query(`UPDATE timers SET name = $name, duration = $duration, startTime = $startTime, isRunning = $isRunning, users = $users WHERE id = $id`);
    try {
      query.run({
        $id: this.id,
        $name: this.name,
        $duration: this.duration,
        $startTime: this.startTime,
        $isRunning: this.isRunning,
        $users: usersJson
      });
    } catch (error) {
      console.error('Error saving timer to database: ', error);
    }
  }
}