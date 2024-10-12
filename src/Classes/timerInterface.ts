import { UserInterface } from "./userInterface";

// Define the interface for the timer class.
// A timer will have:
// - an id
// - a name
// - a duration in seconds
// - a start time in seconds
// - an array of user IDs representing the users who have joined the timer
// - a boolean indicating whether the timer is running or not
// - an owner ID representing the user who created the timer
// - a users string representing a JSON array of user IDs, which are people
// who have joined the timer

export interface TimerInterface {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  // We don't need isRunning because we can calculate it from startTime and duration  
  // isRunning?: boolean;
  owner: UserInterface;
  users: UserInterface[];
  pingQueue: number[]; // array of indices of this.users who have sent a ping
  // TODO: change "deleted" to "deletedAt" and make it a date
  deleted: boolean;
  setName(name: string): void;
  setDurationInMinutes(duration: number): void;
  setOwner(owner: UserInterface): void;
  addUser(user: UserInterface): void;
  removeUser(user: UserInterface): void;
  delete(): void;
  start(): void;
  stop(): void;
  reset(): void;
  isFinished(): boolean;
}
