import { User } from './user';
import { UserInterface } from './userInterface';
import { UserManagerInterface } from './userManagerInterface';
import { Database } from 'bun:sqlite';

export class UserManager implements UserManagerInterface {
    private users: Map<string, UserInterface>;
    private userDb: Database;

    constructor(db: Database) {
      this.users = new Map();
      this.userDb = db;
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

}