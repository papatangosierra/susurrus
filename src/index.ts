// Library Imports
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

// Class Imports
import { Timer } from "./Classes/timer";
import { TimerManager } from "./Classes/timerManager";
import { User } from "./Classes/user";
import { UserManager } from "./Classes/userManager";

// Handler Imports
import { createTimerAsOwner } from "./handlers/createTimerAsOwner";
import { joinTimer } from "./handlers/joinTimer";
import db from "./database";


const app = new Elysia()
  .use(swagger())
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
