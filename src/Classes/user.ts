import { UserInterface } from "./userInterface";
import { Database } from 'bun:sqlite';

export class User implements UserInterface {
  id: string;
  name: string;
  deleted: boolean;

  private userDb: Database;

  constructor(db: Database, userName?: string) {
    this.userDb = db;

    if (userName) {
      this.name = userName;
    } else {
      this.name = this.createName();
    }
    this.id = this.hashUserId(this.name);
    this.deleted = false;
    this.create();
  }

  updateName(name: string): void {
    this.name = name;
  }

  delete(): void {
    this.deleted = true;
  }

  private hashUserId(userName: string): string {
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(userName + Date.now().toString());
    return hasher.digest("hex");
  }

  // Generate a new phonetically plausible name
  private createName(): string {
    const consonants = "bcdfghjklmnpqrstvwxz";
    const vowels = "aeiouy";
    let name = "";
    let length = Math.floor(Math.random() * 5) + 3;
    let useConsonant = true;
    for (let i = 0; i < length; i++) {
      if (useConsonant) {
        name += consonants[Math.floor(Math.random() * consonants.length)];
      } else {
        name += vowels[Math.floor(Math.random() * vowels.length)];
      }
      useConsonant = !useConsonant;
    }
    return name;
  }

  private create(): void {
    const query = this.userDb.query(`INSERT INTO users (id, name) VALUES ($id, $name)`);
    try {
      query.all({
        $id: this.id,
        $name: this.name,
      });
    } catch (error) {
      console.error('Error creating user in database: ', error);
    }
  }

  private save(): void {
    const query = this.userDb.query(`UPDATE users SET name = $name WHERE id = $id`);
    try {
      query.all({
        $id: this.id,
        $name: this.name,
      });
    } catch (error) {
      console.error('Error saving user in database: ', error);
    }
  }

}
