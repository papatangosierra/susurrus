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

  createUser(user: UserInterface): void {
    this.users.set(user.id, user);
  }

  removeUser(id: string): void {
    this.users.delete(id);
  }

  getUser(id: string): UserInterface | null {
    return this.users.get(id) || null;
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
