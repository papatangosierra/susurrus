// Timer class

import { TimerInterface } from "./timerInterface";
import { UserInterface } from "./userInterface";
import { Database } from "bun:sqlite";

export class Timer implements TimerInterface {
  id: string;
  name: string;
  duration: number;
  startTime: number;
  isRunning: boolean;
  users: UserInterface[];
  owner: UserInterface;
  deleted: boolean;
  pingQueue: number[];
  private timerDb: Database;

  constructor(db: Database, owner: UserInterface, id?: string) {
    this.name = "Your timer";
    this.startTime = 0;
    this.duration = 0;
    this.isRunning = false;
    this.users = [];
    this.users.push(owner);
    this.owner = owner;
    this.pingQueue = [];
    this.timerDb = db;
    this.deleted = false;
    if (id) {
      this.id = id;
      this.load(); // if we got an id, that means the timer already exists in the database
    } else {
      this.id = this.createId();
      this.create(); // Create the timer in the database
    }
  }

  setName(name: string): void {
    this.name = name;
    this.save();
  }

  setDurationInMinutes(duration: number): void {
    this.duration = duration * 60 * 1000;
    this.save();
  }

  setOwner(owner: UserInterface): void {
    this.owner = owner;
    this.save();
  }

  // Add a user to the timer
  addUser(user: UserInterface): void {
    this.users.push(user);
    this.save();
  }

  // Remove a user from the timer
  removeUser(user: UserInterface): void {
    this.users = this.users.filter((u) => u.id !== user.id);
    this.save();
  }

  start() {
    this.startTime = Date.now();
    this.isRunning = true;
    this.save();
    console.log(`Timer ${this.id} started at ${this.startTime}`);
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.save();
    } else {
      console.error("Timer is not running and thus cannot be stopped");
    }
  }

  reset() {
    this.duration = 0;
    this.startTime = 0;
    this.isRunning = false;
    this.save();
  }

  isFinished(): boolean {
    if (!this.isRunning) return false;
    const currentTime = Date.now();
    // if the difference between
    // the current time and the start time is greater than
    // or equal to the duration, the timer is finished
    return currentTime - this.startTime >= this.duration;
  }

  delete() {
    this.remove();
    this.deleted = true;
  }

  private createId(): string {
    return Bun.hash(this.owner, Date.now()).toString();
  }

  private create() {
    const usersJson = JSON.stringify(this.users);
    const query = this.timerDb.query(
      `INSERT INTO timers (id, name, duration, startTime, isRunning, owner, users) VALUES ($id, $name, $duration, $startTime, $isRunning, $owner, $users)`,
    );
    try {
      query.all({
        $id: this.id,
        $name: this.name,
        $duration: this.duration,
        $startTime: this.startTime,
        $isRunning: this.isRunning,
        $users: usersJson,
      });
    } catch (error) {
      console.error("Error creating timer in database: ", error);
    }
  }

  private save() {
    const usersJson = JSON.stringify(this.users);
    const query = this.timerDb.query(
      `UPDATE timers SET name = $name, duration = $duration, startTime = $startTime, isRunning = $isRunning, users = $users WHERE id = $id`,
    );
    try {
      query.run({
        $id: this.id,
        $name: this.name,
        $duration: this.duration,
        $startTime: this.startTime,
        $isRunning: this.isRunning,
        $users: usersJson,
      });
    } catch (error) {
      console.error("Error saving timer to database: ", error);
    }
  }

  private load() {
    const query = this.timerDb.query(`SELECT * FROM timers WHERE id = $id`);
    const result = query.get({
      $id: this.id,
    }) as Omit<TimerInterface, "users"> & { users: string }; // TypeScript is now satisfied that it's okay if users is a string (which it is, since it's the JSON stringified array of us)
    if (result) {
      //console.log(`loading timer ${this.id} from database`);
      this.name = result.name;
      this.duration = result.duration;
      this.startTime = result.startTime || 0;
      this.isRunning = result.isRunning || false;

      // Parse the users string into an array and do some basic validation
      try {
        this.users = JSON.parse(result.users);
        if (!Array.isArray(this.users)) {
          console.warn(
            "Parsed users is not an array, defaulting to empty array",
          );
          this.users = [];
        }
      } catch (error) {
        console.error(
          "Failed to parse users JSON, defaulting to empty array",
          error,
        );
        this.users = [];
      }

      this.owner = result.owner;
    }
  }

  private remove() {
    const query = this.timerDb.query(`DELETE FROM timers WHERE id = $id`);
    try {
      query.run({
        $id: this.id,
      });
    } catch (error) {
      console.error("Error removing timer from database: ", error);
    }
  }
}
