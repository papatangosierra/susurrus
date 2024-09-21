import { UserInterface } from "./userInterface";

export class User implements UserInterface {
  id: string;
  name: string;
  timerId!: string | null;

  constructor(userName?: string) {
    if (userName) {
      this.name = userName;
    } else {
      this.name = this.createName();
    }
    this.id = this.hashUserId(this.name);
  }

  // attach user to a timer
  joinTimer(timerId: string): void {
    this.timerId = timerId;
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
}
