import { UserInterface } from "./userInterface";

export interface UserManagerInterface {
  addUser(user: UserInterface): void;
  removeUser(id: string): void;
  getUser(id: string): UserInterface | null;
  getUserByWebsocketId(websocketId: string): UserInterface | null;
}
