import { TimerManager } from "../Classes/timerManager";
import { UserManager } from "../Classes/userManager";
import { ClientState } from "../Classes/clientState";
export async function makeTimer(context: {
  timerManager: TimerManager;
  userManager: UserManager;
  params: {
    userId: string;
  };
}): Promise<object> {
  console.log("makeTimer route called");
  const user = context.userManager.getUser(context.params.userId);
  if (!user) {
    return { error: "User not found" };
  }
  const timer = context.timerManager.createTimer(user);
  const clientState = new ClientState(user, timer);
  return clientState.getAsObject();
}

