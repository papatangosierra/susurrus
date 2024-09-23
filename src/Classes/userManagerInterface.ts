import { UserInterface } from "./userInterface";

export interface UserManagerInterface {
    addUser(user: UserInterface): void;
    removeUser(user: UserInterface): void;
    getUser(id: string): UserInterface;
    getUsers(timerId: string): UserInterface[];
}