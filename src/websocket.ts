import Elysia, { t } from "elysia";
import { User } from "./Classes/user";
import { UserManager } from "./Classes/userManager";
import { TimerManager } from "./Classes/timerManager";
import { ClientState } from "./Classes/clientState";
import { db } from "./db";
export const websocket = new Elysia()
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
  });