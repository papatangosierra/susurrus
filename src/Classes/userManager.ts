import { User } from "./user";
import { UserInterface } from "./userInterface";
import { UserManagerInterface } from "./userManagerInterface";
import { Database } from "bun:sqlite";

export class UserManager implements UserManagerInterface {
  private users: Map<string, UserInterface>;
  private userDb: Database;

  constructor(db: Database) {
    this.users = new Map();
    this.userDb = db;
    this.loadUsersFromDatabase();
  }

  addUser(user: UserInterface): void {
    this.users.set(user.id, user);
  }

  removeUser(id: string): void {
    this.users.delete(id);
  }

  getUser(id: string): UserInterface | null {
    return this.users.get(id) || null;
  }
  // Get a user by their websocket ID. We only do this when a user disconnects,
  // to remove them from the user manager's list. This should happen relatively
  // rarely, so it's probably  not a big deal to do a linear search. Nevertheless,
  // TODO: optimize by using a map from websocket ID to user ID.
  getUserByWebsocketId(websocketId: string): UserInterface | null {
    for (const user of this.users.values()) {
      if (user.websocketId === websocketId) {
        return user;
      }
    }
    return null;
  }

  private loadUsersFromDatabase(): void {
    const users = this.userDb.query("SELECT * FROM users").all();
    // console.log(users);
    for (const user of users as UserInterface[]) {
      const newUser = new User(this.userDb, user.id);
      this.users.set(user.id, newUser);
    }
  }
}
