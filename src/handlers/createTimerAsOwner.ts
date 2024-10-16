import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import { TimerManagerInterface } from "../Classes/timerManagerInterface";
import db from "../database";
import { TimerInterface } from "../Classes/timerInterface";

export async function createTimerAsOwner(context: {
  timerManager: TimerManagerInterface;
}): Promise<TimerInterface> {
  const userManager = new UserManager(db);
  const user = new User(db);
  userManager.addUser(user);
  console.log(
    `We made a user. Their name is: ${user.name}. Their ID is ${user.id}`,
  );
  const newTimer = context.timerManager.createTimer(user);
  console.log(`We made a timer. The timer's id is ${newTimer.id}.`);
  newTimer.setDurationInMinutes(10);
  return newTimer;
}
