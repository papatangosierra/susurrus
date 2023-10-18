import { SHA256 } from "bun";
import { IUser } from "./userInterface";

export class User implements IUser {
  id: string;
  name: string;
  timerId: string | null;

  constructor(timerId = null) {
    this.name = this.createName();
    // set the user's ID to the sha256 hash of their name and the current time
    this.id = SHA256(this.name + Date.now().toString());
    timerId = null;
    
    // If a timer ID is provided, set the user's timer ID to it
    if (timerId) {
      this.timerId = timerId; 
    }
  }

  // attach user to a timer
  joinTimer(timerId: string): void {
    this.timerId = timerId;
  }

  // Generate a new phonetically plausible name
  private createName(): string {
    console.log("Creating a new name");
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
}