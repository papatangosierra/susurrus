import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import db from "../database";

export async function getUser(context: {
  userManager: UserManager;
}): Promise<object> {
  const user = new User(db);
  context.userManager.createUser(user);
  return {
    id: user.id,
    name: user.name
  };
}
