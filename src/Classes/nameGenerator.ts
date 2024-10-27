import { firstNames, lastNames } from "../Definitions/hollywoodNames";

/*
  This class is responsible for generating a random name from the list of first and last names.
*/

export class NameGenerator {
  private firstNames: string[];
  private lastNames: string[];

  constructor() {
    this.firstNames = firstNames;
    this.lastNames = lastNames;
  }

  generateName(): string {
    const firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
    return `${firstName} ${lastName}`;
  }
}
