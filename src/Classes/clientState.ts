import { ClientStateInterface } from "./clientStateInterface";
import { UserInterface } from "./userInterface";
import { TimerInterface } from "./timerInterface";

export class ClientState implements ClientStateInterface {
  user: UserInterface;
  timer: TimerInterface | null;

  constructor(user: UserInterface, timer?: TimerInterface) {
    this.user = user;
    this.timer = timer ?? null;
  }

  getAsObject(): object {
    return {
      user: this.user,
      timer: this.timer,
    };
  }
}
