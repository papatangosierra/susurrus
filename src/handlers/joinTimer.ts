import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import { TimerManager } from "../Classes/timerManager";
import db from "../database";

export async function joinTimer(context: {
  params: { timerId: string };
}): Promise<object> {
  const user = new User(db);
  const userManager = new UserManager(db);
  userManager.createUser(user);
  const timerManager = new TimerManager(db);
  const timer = timerManager.getTimer(context.params.timerId);
  console.log(JSON.stringify(context.params));
  if (timer) {
    timerManager.addUserToTimer(timer.id, user.id);
    return {
      timer: {
        id: timer.id,
        name: timer.name,
      }
    };
  } else {
    // TODO: if timer not found, create a new timer
    return `Timer ${context.params.timerId} not found`;
  }
}
