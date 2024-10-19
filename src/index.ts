// Library Imports
import { Elysia, t } from "elysia";
import { ElysiaWS } from "elysia/dist/ws/index";
import { swagger } from "@elysiajs/swagger";

// Manager Imports
import { Timer } from "./Classes/timer";
import { TimerManager } from "./Classes/timerManager";
import { UserManager } from "./Classes/userManager";
import { WebSocketManager } from "./Classes/webSocketManager";
// Handler Imports
import { joinTimer } from "./handlers/joinTimer";
import { getUser } from "./handlers/getUser";
import { makeTimer } from "./handlers/makeTimer";
import { StateUpdateService } from "./Classes/stateUpdateService";
// SQLite Database
import db from "./database";
import { User } from "./Classes/user";




// Instantiate the timer and user managers
const timerManager = new TimerManager(db);
const userManager = new UserManager(db);
const wsManager = new WebSocketManager();
const stateUpdateService = new StateUpdateService(timerManager, userManager, wsManager);

// Instantiate the websocket
const websocket = new Elysia()
  .decorate("timerManager", timerManager)
  .decorate("userManager", userManager)
  // gives us a new user object to use in the websocket
    // (accessible inside the methods as ws.data.user)
  .derive( context => ({ 
    "user": new User(db)
  }))
  .ws("/ws", {
    open(ws) {
      console.log("websocket connection opened with id: " + ws.id);
      const providedTimerId = ws.data.query.timerId;
      const user = ws.data.user;
      const timerManager = ws.data.timerManager;
      // If the timerId was provided in the URL, join the timer
      if (providedTimerId) {
        // Join existing timer
        const timer = timerManager.getTimer(providedTimerId);
        if (timer) {
          //handleUserJoinedStateUpdate(ws, timer, user);
          timerManager.addUserToTimer(user, providedTimerId, ws);
        } else {
          // TODO: Handle the case of an invalid timerId in a way
          // that is more useful to the user
          ws.send({ error: `Timer ${providedTimerId} not found` });
        }
      } else {
        // Create new timer
        console.log("creating new timer");
        timerManager.createTimer(user, ws);
        //handleInitialStateUpdate(ws, timer, user);
      }
    },

    message(ws, message) {
      console.log("got websocket message: " + message);
      if (message.type === 'UPDATE_TIMER') {
        const timerId = message.payload.timerId;
        ws.publish(timerId, message);
      }
      // ws.send(dummyPlug);
    },

    close(ws) {
      console.log("websocket connection closed");
      const user = ws.data.user;
      const timerId = user.timerId;
      console.log("removing user: ", user.name);
      timerManager.removeUserFromTimer(user, timerId, ws);
      userManager.removeUser(user.id);
      // Find a way to do this without type assertion
      // handleUserLeftStateUpdate(ws, timerManager.getTimer(timerId)!, user);
    }
  });

const app = new Elysia()
  .use(swagger())
  // load the managers into the app state
  .decorate("timerManager", timerManager)
  .decorate("userManager", userManager)
  .decorate("db", db)
  /* 
    Anyone visiting the site gets the frontend
   */
  .get("/", () => {
    //console.log("index.html requested");
    return Bun.file("./frontend/dist/index.html");
  })
  .get("/js/App.js", () => {
    //console.log("App.js requested");
    return Bun.file("./frontend/public/js/App.js");
  })
  .get("/styles.css", () => {
    //console.log("styles.css requested");
    return Bun.file("./frontend/public/styles.css");
  })

  /* When the client requests a user identity, we should give them one */
  .get("/get-user", getUser)

  /* When the client requests to make a timer, they give us their user id 
  and we make a timer for them and tell them its id*/
  .get("/make-timer/:userId", makeTimer)

  /* When the client provides a timerId, we should join them to that timer, making a new user
  in the process */
  .get("/timers/:timerId", () => {
    console.log("Timer Join requested");
    return Bun.file("./frontend/dist/index.html");
  })  /* Use a websocket to send updates to the client about the timer */
  .use(websocket)
  // .get("/timers/:id/users", getUsersForTimer)
  // .put("/timers/:id/start", startTimer)
  // .put("/timers/:id/stop", stopTimer)
  .listen(3000);

console.log(
  `🦊 Timer server is running at ${app.server?.hostname}:${app.server?.port}`,
);
