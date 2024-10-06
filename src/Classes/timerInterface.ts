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
  startTime?: number;
  isRunning?: boolean;
  owner: string;
  users: string[]; 
  pingQueue: number[]; // array of indices of this.users who have sent a ping
  // TODO: change "deleted" to "deletedAt" and make it a date
  deleted: boolean;
  setName(name: string): void;
  setDurationInMinutes(duration: number): void;
  setOwner(id: string): void;
  addUser(userId: string): void;
  removeUser(userId: string): void;
  delete(): void;
  start(): void;
  stop(): void;
  reset(): void;
  isFinished(): boolean;
}

