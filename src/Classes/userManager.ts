import { User } from './user';
import { UserInterface } from './userInterface';
import { UserManagerInterface } from './userManagerInterface';
import { Database } from 'bun:sqlite';
import db from "../database";

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

  // Generate a new phonetically plausible name
  private generateName(): string {
    const capitalConsonants = "BCDFGHJKLMNPQRSTVWXYZ"
    const consonants = "bcdfghjklmnpqrstvwxz";
    const vowels = "aeiouy";
    let name = "";
    let length = Math.floor(Math.random() * 5) + 3;
    let useConsonant = true;
    for (let i = 0; i < length; i++) {
      if (i == 0) {
        name += capitalConsonants[Math.floor(Math.random() * capitalConsonants.length)];
        continue;
      }
      if (useConsonant) {
        name += consonants[Math.floor(Math.random() * consonants.length)];
      } else {
        name += vowels[Math.floor(Math.random() * vowels.length)];
      }
      useConsonant = !useConsonant;
    }
    return name;
  }


}