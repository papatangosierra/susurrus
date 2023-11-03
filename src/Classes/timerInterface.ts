// Define the interface for the timer class.
// A timer will have:
// - an id
// - a name
// - a duration in seconds
// - a start time in seconds
// - an array of user IDs representing the users who have joined the timer
// - a boolean indicating whether the timer is running or not

export interface TimerInterface {
  id: string;
  name: string;
  duration: number;
  startTime?: number;
  isRunning?: boolean;
  users: string[];
}