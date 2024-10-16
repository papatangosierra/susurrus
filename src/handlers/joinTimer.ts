import { UserManager } from "../Classes/userManager";
import { TimerManager } from "../Classes/timerManager";
import { ClientState } from "../Classes/clientState";
import { Database } from "bun:sqlite";
import { User } from "../Classes/user";

export async function joinTimer(context: {
  timerManager: TimerManager,
  userManager: UserManager,
  db: Database,
  params: { timerId: string };
}): Promise<object> {
  const timer = context.timerManager.getTimer(context.params.timerId);
  if (timer) {
    const user = new User(context.db);
    context.userManager.addUser(user);
    context.timerManager.addUserToTimer(user, timer.id);
    const clientState = new ClientState(user, timer);
    return {
      type: 'JOINED_TIMER',
      payload: clientState.getAsObject(),
      timerId: timer.id
    };
  } else {
    return { error: `Timer ${context.params.timerId} not found` };
  }
}
