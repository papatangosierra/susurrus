import { TimerManager } from "../Classes/timerManager";
import { UserManager } from "../Classes/userManager";
import db from "../database";

export async function makeTimer(context: {
  timerManager: TimerManager;
  userManager: UserManager;
  params: {
    userId: string;
  };
}): Promise<object> {
  const user = context.userManager.getUser(context.params.userId);
  if (!user) {
    return { error: "User not found" };
  }
  const timer = context.timerManager.createTimer(user.id);
  return {
    id: timer.id
  };
}
