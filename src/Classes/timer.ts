// Timer class

import { TimerInterface } from "./timerInterface";
import { TimerEntity } from "./timerEntity";  

export class Timer implements TimerInterface {
  id: string;
  name: string;
  duration: number;
  startTime?: number;
  isRunning: boolean;
  users: string[];
  owner: string;
  entity: Promise<TimerEntity>;

  constructor(owner: string) {
    this.id = this.createId();
    this.name = "Your timer";
    this.startTime = 0;
    this.duration = 0;
    this.isRunning = false;
    this.users = [];
    this.owner = owner;
    this.entity = this.create();
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

  async start() {
    if (!this.isRunning) {
      this.startTime = Date.now();
      const endTime = this.startTime + this.duration * 1000;
      this.duration = Math.floor((endTime - this.startTime) / 1000);
      this.isRunning = true;
      console.log(`Timer ${this.id}, owned by ${this.owner} started`);
      setTimeout(() => {
        this.stop();
      }, this.duration * 1000);
      // update Timer entity's start time
      this.startTime = Date.now();
      this.entity.isRunning = true;
      this.entity.startTime = this.startTime;
      (await this.entity).save();
      console.log(`Value of timer DB entity isRunning: ${this.entity.isRunning}`);
      // TODO: send timer start event to all users in timer
    }
  }

  async stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.entity.isRunning = false;
      (await this.entity).save();
      console.log(`Timer ${this.id} stopped`);
      console.log(`Value of timer DB entity isRunning: ${this.entity.isRunning}`);
      // TODO: send timer stop event to all users in timer
    }
  }

  reset() {
    this.duration = 0;
    this.startTime = 0;
    this.isRunning = false;
  }

  private createId(): string {
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(Date.now().toString() + Math.random().toString());
    return hasher.digest("hex");
  }

  private async create(): Promise<TimerEntity> {
    const timerEntity = TimerEntity.build({
      id: this.id,
      name: this.name,
      duration: this.duration,
      startTime: this.startTime,
      isRunning: this.isRunning,
      users: this.users,
      ownerId: this.owner,
    });
    await timerEntity.save();
    return timerEntity;
  }

}