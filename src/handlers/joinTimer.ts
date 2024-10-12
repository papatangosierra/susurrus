import { UserManager } from "../Classes/userManager";
import { TimerManager } from "../Classes/timerManager";
import { ClientState } from "../Classes/clientState";

export async function joinTimer(context: {
  timerManager: TimerManager,
  userManager: UserManager,
  params: { timerId: string, userId: string  };
}): Promise<object> {
  const timer = context.timerManager.getTimer(context.params.timerId);
  if (timer) {
    const user = context.userManager.getUser(context.params.userId);
    if (user) {
      context.timerManager.addUserToTimer(user, timer.id);
      const clientState = new ClientState(user, timer);
      return clientState.getAsObject();
    } else {
      return { error: `User ${context.params.userId} not found` };
    }
  } else {
    return { error: `Timer ${context.params.timerId} not found` };
  }
}
