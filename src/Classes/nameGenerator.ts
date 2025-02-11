import { firstNames, lastNames } from "../Definitions/hollywoodNames";

/*
  This class is responsible for generating a random name from the list of first and last names.
*/

export class NameGenerator {
  private firstName: string;
  private lastName: string;

  constructor() {
    this.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    this.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    //this.consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];

  }

  private mutateFirstName(name: string): string {
    let mutatedName: string;
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];
    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    let frequency = 0.5;
    let scareQuotesFrequency = 0.1;
    // if the first letter is a consonant, change it to a different, random consonant
    if (consonants.includes(name[0]) && Math.random() < frequency) {
      return consonants[Math.floor(Math.random() * consonants.length)] + name.slice(1);
    } else if (Math.random() < scareQuotesFrequency) { 
      return `"${name}"`;
    }
    return name;
  }

  private mutateLastName(name: string): string {
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];
    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    let mutatedName: string = name;
    let prefixes = ['Mc', 'Mac', 'O\'', 'De'];
    let suffixes = ['son', 'er'];
    let frequency = 0.5;
    let prefixFrequency = 0.1;
    let suffixFrequency = 0.1;
    // if the first letter is a consonant, change it to a different, random consonant
    if (consonants.includes(name[0]) && Math.random() < frequency) {
      mutatedName = consonants[Math.floor(Math.random() * consonants.length)] + name.slice(1);
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
    const firstName = this.mutateFirstName(this.firstName);
    const lastName = this.mutateLastName(this.lastName);
    return `${firstName} ${lastName}`;
  }
}
