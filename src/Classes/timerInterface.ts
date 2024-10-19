import { UserInterface } from "./userInterface";

// Define the interface for the timer class.
// A timer will have:
// - an id
// - a name
// - a duration 
// - a start time 
// - an array of User objects representing the users who have joined the timer
// - a boolean indicating whether the timer is running or not
// - an owner User object representing the user who created the timer
// - a deletedAt date representing the time the timer was deleted, if it has been deleted


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
  deletedAt: number;
  setName(name: string): void;
  setDurationInMinutes(duration: number): void;
  setOwner(owner: UserInterface): void;
  addUser(user: UserInterface): void;
  removeUser(user: UserInterface): void;
  delete(): void;
  start(): void;
  reset(duration?: number): void;
  isFinished(): boolean;
}
