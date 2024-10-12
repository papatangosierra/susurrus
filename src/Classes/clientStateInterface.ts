/* clientStateInterface defines the shape of the data we send to the client */
import { TimerInterface } from "./timerInterface";
import { UserInterface } from "./userInterface";

export interface ClientStateInterface {
  timer?: TimerInterface | null;
  user?: UserInterface | null;
}
