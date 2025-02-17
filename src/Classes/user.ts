import { UserInterface } from "./userInterface";
import { NameGenerator } from "./nameGenerator";
import { Database } from "bun:sqlite";

export class User implements UserInterface {
  id: string;
  name: string;
  websocketId: string = "";
  timerId: string = "";
  deleted: boolean;

  private userDb: Database;
  private nameGenerator: NameGenerator;
  constructor(db: Database, id?: string) {
    this.userDb = db;
    this.nameGenerator = new NameGenerator();

    this.name = this.nameGenerator.generateName();

    // if we got an id, that mean the user already exists in the database, so load instead of create
    if (id) {
      this.id = id;
      //// console.log(`Loading user ${this.id} from database`);
      this.load();
    } else {
      this.id = this.hashUserId(this.name);
      // console.log(`Creating user ${this.name} with id: ${this.id} in database`);
      this.create();
    }
    this.id = this.hashUserId(this.name);
    this.deleted = false;
  }

  updateName(name: string): void {
    this.name = name;
  }

  delete(): void {
    this.deleted = true;
    this.remove();
  }

  private hashUserId(userName: string): string {
    return Bun.hash(userName, Date.now()).toString();
  }

  // Generate a new phonetically plausible name
  // private createName(): string {
  //   const consonants = "bcdfghjklmnprstvwxz";
  //   const vowels = "aeiouy";
  //   let name = "";
  //   let length = Math.floor(Math.random() * 5) + 3;
  //   let useConsonant = true;
  //   for (let i = 0; i < length; i++) {
  //     if (useConsonant) {
  //       name += consonants[Math.floor(Math.random() * consonants.length)];
  //     } else {
  //       name += vowels[Math.floor(Math.random() * vowels.length)];
  //     }
  //     useConsonant = !useConsonant;
  //   }
  //   return name[0].toUpperCase() + name.slice(1);
  // }

  private createName(): string {
    return this.nameGenerator.generateName();
  }

  private create(): void {
    const query = this.userDb.query(
      `INSERT INTO users (id, name) VALUES ($id, $name)`,
    );
    try {
      query.all({
        $id: this.id,
        $name: this.name,
      });
    } catch (error) {
      console.error("Error creating user in database: ", error);
    }
  }

  private load(): void {
    const query = this.userDb.query(`SELECT * FROM users WHERE id = $id`);
    const result = query.get({
      $id: this.id,
    }) as UserInterface;
    this.name = result.name;
  }

  private save(): void {
    const query = this.userDb.query(
      `UPDATE users SET name = $name WHERE id = $id`,
    );
    try {
      query.all({
        $id: this.id,
        $name: this.name,
      });
    } catch (error) {
      console.error("Error saving user in database: ", error);
    }
  }

  private remove(): void {
    // console.log(`purging user ${this.name} with id: ${this.id}`);
    const query = this.userDb.query(`DELETE FROM users WHERE id = $id`);
    try {
      query.all({
        $id: this.id,
      });
    } catch (error) {
      console.error("Error removing user in database: ", error);
    }
  }
}
