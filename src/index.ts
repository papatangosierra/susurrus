// Library Imports
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

// Class Imports
import { Timer } from "./Classes/timer";
import { TimerManager } from "./Classes/timerManager";


// Handler Imports
import { createTimerAsOwner } from "./handlers/createTimerAsOwner";
import { joinTimer } from "./handlers/joinTimer";
import db from "./database";

// Instantiate the timer manager
const timerManager = new TimerManager(db);

const app = new Elysia()
  .use(swagger())
  // load the timer manager into the app state
  .decorate("timerManager", timerManager)
   /* 
    We create a user for anyone visiting the site.
   */
  .get("/", createTimerAsOwner) 
  // .get("/user/:id", getUser)
  // .post("/timers", createTimer)
  .get("/timers/:timerId", joinTimer)
  // .get("/timers/:id/users", getUsersForTimer)
  // .put("/timers/:id/start", startTimer)
  // .put("/timers/:id/stop", stopTimer)
  .listen(3000);


console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`
);
