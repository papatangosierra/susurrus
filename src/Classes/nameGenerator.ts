import { firstNames, lastNames } from "../Definitions/hollywoodNames";

/*
  This class is responsible for generating a random name from the list of first and last names.
*/

export class NameGenerator {
  private firstNames: string[];
  private lastNames: string[];

  private consonants: string[];
  private vowels: string[];

  constructor() {
    this.firstNames = firstNames;
    this.lastNames = lastNames;
    this.consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];
    this.vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
  }

  private mutateFirstName(name: string): string {
    let mutatedName: string;
    let frequency = 0.5;
    // if the first letter is a consonant, change it to a different, random consonant
    if (this.consonants.includes(name[0]) && Math.random() < frequency) {
      return this.consonants[Math.floor(Math.random() * this.consonants.length)] + name.slice(1);
    }
    return name;
  }

  private mutateLastName(name: string): string {
    let mutatedName: string = name;
    let prefixes = ['Mc', 'Mac', 'O\''];
    let suffixes = ['son', 'er'];
    let frequency = 0.5;
    let prefixFrequency = 0.1;
    let suffixFrequency = 0.1;
    // if the first letter is a consonant, change it to a different, random consonant
    if (this.consonants.includes(name[0]) && Math.random() < frequency) {
      mutatedName = this.consonants[Math.floor(Math.random() * this.consonants.length)] + name.slice(1);
    }

    // add a prefix
    if (Math.random() < prefixFrequency) {
      return prefixes[Math.floor(Math.random() * prefixes.length)] + mutatedName;
    }

    // add a suffix
    if (Math.random() < suffixFrequency) {
      return mutatedName + suffixes[Math.floor(Math.random() * suffixes.length)];
    }

    return mutatedName;
  }

  generateName(): string {
    const firstName = this.mutateFirstName(this.firstNames[Math.floor(Math.random() * this.firstNames.length)]);
    const lastName = this.mutateLastName(this.lastNames[Math.floor(Math.random() * this.lastNames.length)]);
    return `${firstName} ${lastName}`;
  }
}
