import { TimerInterface } from "./timerInterface";

// Define the interface for the timer class.
export interface TimerManagerInterface {
  createTimer(owner: string): TimerInterface;
  getTimer(id: string): TimerInterface | null;
  deleteTimer(id: string): void;
  startTimer(id: string): void;
  stopTimer(id: string): void;
  resetTimer(id: string, duration?: number): void;
  addUserToTimer(id: string, userId: string): void;
  removeUserFromTimer(id: string, userId: string): void;
  isFinished(id: string): boolean;
  getUsersForTimer(id: string): string[];
  // TODO: Implement purgeStaleTimers()
  // purgeStaleTimers(): number;
}
