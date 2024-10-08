// Library Imports
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

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
    Anyone visiting the site gets the frontend
   */
  .get("/", () => {
    console.log("index.html requested");
    return Bun.file("./frontend/dist/index.html");
  })
  .get("/js/App.js", () => {
    console.log("App.js requested");
    return Bun.file("./frontend/public/js/App.js");
  })
  .get("/styles.css", () => {
    console.log("styles.css requested");
    return Bun.file("./frontend/public/styles.css");
  })
  // .get("/user/:id", getUser)
  // .post("/timers", createTimer)
  .get("/timers/:timerId", joinTimer)
  // .get("/timers/:id/users", getUsersForTimer)
  // .put("/timers/:id/start", startTimer)
  // .put("/timers/:id/stop", stopTimer)
  .listen(3000);

console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`,
);
