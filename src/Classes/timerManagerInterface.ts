import { TimerInterface } from "./timerInterface";
import { UserInterface } from "./userInterface";
import { ElysiaWS } from "elysia/dist/ws";
import { ServerWebSocket } from "bun";
// Define the interface for the timer class.
export interface TimerManagerInterface {
  createTimer(owner: UserInterface, ws: ElysiaWS<any, any, any>): TimerInterface;
  getTimer(id: string): TimerInterface | null;
  deleteTimer(id: string, ws: ElysiaWS<any, any, any>): void;
  startTimer(id: string, ws: ElysiaWS<any, any, any>): void;
  resetTimer(id: string, duration: number, ws: ElysiaWS<any, any, any>): void;
  addUserToTimer(user: UserInterface, timerId: string, ws: ElysiaWS<any, any, any>): void;
  removeUserFromTimer(user: UserInterface, timerId: string, ws: ElysiaWS<any, any, any>): void;
  isFinished(id: string): boolean;
  getUsersForTimer(id: string): UserInterface[];
  pingTimerOfUser(user: UserInterface, ws: ElysiaWS<any, any, any>): void;
  // TODO: Implement purgeStaleTimers()
  // purgeStaleTimers(): number;
}
