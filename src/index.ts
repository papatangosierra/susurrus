// Library Imports
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

// Class Imports
import { Timer } from "./Classes/timer";
import { TimerManager } from "./Classes/timerManager";
import { UserManager } from "./Classes/userManager";

// Handler Imports
import { joinTimer } from "./handlers/joinTimer";
import { getUser } from "./handlers/getUser";
import { makeTimer } from "./handlers/makeTimer";
import { websocket } from "./websocket";
// SQLite Database
import db from "./database";
import { User } from "./Classes/user";
import { ClientState } from "./Classes/clientState";
import { ServerWebSocket } from "bun";

// Dummy Test State 
const dummyPlug = {
  timer: {
    id: "abc",
    name: "Juppun Souji",
    duration: 10000,
    startTime: 0,
    owner: {
      id: "1",
      name: "Paul",
    },
    users: [
      { id: "1", name: "Paul" },
      { id: "2", name: "Whit" },
      { id: "3", name: "Christine" },
      { id: "4", name: "Angela" },
      { id: "5", name: "Molly" },
    ],
    pingQueue: [],
    deletedAt: 0,
  },
  user: {
    id: "1",
    name: "Paul",
  }
}

// Instantiate the timer and user managers
const timerManager = new TimerManager(db);
const userManager = new UserManager(db);

const app = new Elysia()
  .use(swagger())
  // load the timer manager into the app state
  .decorate("timerManager", timerManager)
  .decorate("userManager", userManager)
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

  /* When the client requests a user identity, we should give them one */
  .get("/get-user", getUser)

  /* When the client requests to make a timer, they give us their user id 
  and we make a timer for them and tell them its id*/
  .get("/make-timer/:userId", makeTimer)

  /* When the client provides a timerId, we should join them to that timer, making a new user
  in the process */
  .get("/timers/:timerId/:userId", joinTimer)

  /* Use a websocket to send updates to the client about the timer */
  .ws("/ws", {
    open(ws) {
      const user = new User(db);
      userManager.createUser(user);
      const timer = timerManager.createTimer(user);  
      const clientState = new ClientState(user, timer);
      console.log("websocket connection opened");
      ws.send(clientState.getAsObject());
    },
    message(ws, message) {
      console.log("got websocket message: ", message);      
      // ws.send(dummyPlug);
    },
    close(ws) {
      console.log("websocket connection closed;");
      // userManager.removeUser(ws.data.body.user.id);
    }
  })
  // .get("/timers/:id/users", getUsersForTimer)
  // .put("/timers/:id/start", startTimer)
  // .put("/timers/:id/stop", stopTimer)
  .listen(3000);

console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`,
);
