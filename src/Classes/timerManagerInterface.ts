import { TimerInterface } from "./timerInterface";


// Define the interface for the timer class.
export interface TimerManagerInterface {
  createTimer(owner: string, ): TimerInterface;
  getTimer(id: string): TimerInterface | null;
  updateTimer(id: string, name: string, duration: number, owner: string, users: string[]): void;
  deleteTimer(id: string): void;
  startTimer(id: string): void;
  stopTimer(id: string): void;
  resetTimer(id: string): void;
  isFinished(id: string): boolean;
}