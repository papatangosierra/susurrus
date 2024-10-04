import { User } from "../Classes/user";
import { UserManager } from "../Classes/userManager";
import { TimerManagerInterface } from "../Classes/timerManagerInterface";
import db from "../database";

export async function createTimerAsOwner( timerManager: TimerManagerInterface ): Promise<string> {
  const userManager = new UserManager(db);
  const user = new User(db);
  userManager.addUser(user);
  console.log(
    `We made a user. Their name is: ${user.name}. Their ID is ${user.id}`
  );

  const newTimer = timerManager.createTimer(user.id);
  console.log(
    `We made a timer. The timer's id is ${newTimer.id}.`
  )
  newTimer.setDurationInMinutes(10);
  return `Hello, user ${user.name}. Your timer's id is ${newTimer.id}. The timer is set for ${newTimer.duration} minutes.`;
}

