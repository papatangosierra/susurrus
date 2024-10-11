import { TimerManager } from "../Classes/timerManager";
import db from "../database";

export async function makeTimer(context: {
  timerManager: TimerManager;
  userId: string;
}): Promise<object> {
  const timer = context.timerManager.createTimer(context.userId);
  return {
    id: timer.id
  };
}
