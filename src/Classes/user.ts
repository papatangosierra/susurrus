import { IUser } from "./userInterface";

export class User implements IUser {
  id: string;
  name: string;
  timerId!: string | null;

  constructor(userLabel: UserLabel) {
    this.name = userLabel.userName;
    this.id = userLabel.userId;
  }

  // attach user to a timer
  joinTimer(timerId: string): void {
    this.timerId = timerId;
  }
}
