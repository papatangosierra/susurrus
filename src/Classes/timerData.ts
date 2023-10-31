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
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.startTime = 0;
    this.isRunning = false;
    this.users = [];
    this.owner = owner;
  }

}