import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import db from "../database";

export async function getUser(context: {
  userManager: UserManager;
}): Promise<string> {
  const user = new User(db);
  context.userManager.createUser(user);
  return JSON.stringify({
    id: user.id,
    name: user.name
  });
}
