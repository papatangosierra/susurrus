import { User } from './user';
import { UserInterface } from './userInterface';
import { UserManagerInterface } from './userManagerInterface';
import { Database } from 'bun:sqlite';
import db from "../database";

export class UserManager implements UserManagerInterface {
    private users: Map<string, UserInterface>;
    private userDb: Database;
  
    addUser(user: UserInterface): void {
        this.users.push(user);
    }

    removeUser(user: UserInterface): void {
        this.users = this.users.filter((u) => u.id !== user.id);
    }

    getUser(id: string): UserInterface {
        return this.users.find((u) => u.id === id);
    }

    getUsers(): UserInterface[] {
        return this.users;
    }
}