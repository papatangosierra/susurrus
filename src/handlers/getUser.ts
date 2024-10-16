import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import { ClientState } from "../Classes/clientState";
import db from "../database";

export async function getUser(context: {
  userManager: UserManager;
}): Promise<object> {
  const user = new User(db);
  context.userManager.addUser(user);
  const clientState = new ClientState(user);
  return clientState.getAsObject();
}
