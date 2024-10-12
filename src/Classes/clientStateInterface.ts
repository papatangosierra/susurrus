/* clientStateInterface defines the shape of the data we send to the client */
import { TimerInterface } from "./timerInterface";
import { UserInterface } from "./userInterface";

/*
  the User in clientStateInterface is the user information for this specific client.
  There will also be User objects in the timer, and the way we'll identify the user 
  in a "THIS IS YOU" sense is by comparing the clientState user to those in the timer.
*/

export interface ClientStateInterface {
  timer?: TimerInterface | null;
  user?: UserInterface | null;
}
