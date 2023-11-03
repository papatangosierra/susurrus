import { ITimer } from "./timerInterface";

export class TimerData implements ITimer {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  isRunning: boolean;
  users: string[];
  owner: string;

  constructor(id: string, name: string, duration: number, owner: string) {
    this.id = this.createId();
    this.name = name;
    this.duration = duration;
    this.startTime = 0;
    this.isRunning = false;
    this.users = [];
    this.owner = owner;
  }

  private createId(): string {
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(Date.now().toString() + Math.random().toString());
    return hasher.digest("hex");
  }

}