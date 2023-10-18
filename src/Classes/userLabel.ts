import { IUserLabel } from "./userLabelInterface";

export class UserLabel implements IUserLabel {
  // Generate a hash for a user ID
  userName: string;
  userId: string;

  constructor() {
    this.userName = this.createName();
    this.userId = this.hashUserId(this.userName);
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
