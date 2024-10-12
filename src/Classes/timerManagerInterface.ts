import { TimerInterface } from "./timerInterface";
import { UserInterface } from "./userInterface";
// Define the interface for the timer class.
export interface TimerManagerInterface {
  createTimer(owner: UserInterface): TimerInterface;
  getTimer(id: string): TimerInterface | null;
  deleteTimer(id: string): void;
  startTimer(id: string): void;
  resetTimer(id: string, duration?: number): void;
  addUserToTimer(user: UserInterface, timerId: string): void;
  removeUserFromTimer(user: UserInterface, timerId: string): void;
  isFinished(id: string): boolean;
  getUsersForTimer(id: string): UserInterface[];
  // TODO: Implement purgeStaleTimers()
  // purgeStaleTimers(): number;
}
