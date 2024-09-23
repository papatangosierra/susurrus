// Library Imports
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

// My Imports
import { Timer } from "./Classes/timer";
import { TimerManager } from "./Classes/timerManager";
import { User } from "./Classes/user";
import db from "./database";


const app = new Elysia()
  .use(swagger())
  .get("/", index)
  .listen(3000);

/**
 * @returns string
 * index() is the function that will be called when the / route is hit.
 * The return value is a string that will be sent to the client.
 * (i.e., the HTML source we're sending to the browser)
 */

async function index(): Promise<string> {
  const user = new User();
  console.log(
    `We made a user. Their name is: ${user.name}. Their ID is ${user.id}`
  );

  const timerManager = new TimerManager(db);
  const newTimer = timerManager.createTimer(user.id);

  newTimer.setDuration(10);
  newTimer.start();
  return `Hello, user ${user.name}.`;
}


console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);
