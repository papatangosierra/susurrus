import { UserInterface } from "./userInterface";

export interface UserManagerInterface {
  createUser(user: UserInterface): void;
  removeUser(id: string): void;
  getUser(id: string): UserInterface | null;
}
