import { ElysiaWS } from "elysia/dist/ws";
/* 
Websocket connection manager class. Reduces websocket connection management to
exactly the things we do. The StateUpdateService (TODO) will listen for state
change events emitted by the TimerManager and the UserManager, and will call
the appropriate methods of this class to send the appropriate state updates
to the appropriate clients.
*/
export class WebSocketManager {
  // TODO: fix that <any, any, any> bullshit
  // TODO: use publish/subscribe pattern for state updates

  addConnection(timerId: string, ws: ElysiaWS<any, any, any>) {
    ws.subscribe(timerId);
  }

  removeConnection(timerId: string, ws: ElysiaWS<any, any, any>) {
    ws.unsubscribe(timerId);
  }

  sendToUser(data: any, ws: ElysiaWS<any, any, any>) {
    if (data) {
      ws.send(data);
    }
  }

  broadcastToTimer(timerId: string, data: any, ws: ElysiaWS<any, any, any>) {
    console.log("broadcasting to timer: ", timerId);
    if (data) {
      ws.publish(timerId, data);
    }
  }
}