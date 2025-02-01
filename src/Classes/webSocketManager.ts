import { ElysiaWS } from "elysia/dist/ws";
/* 
Websocket connection manager class. Reduces websocket connection management to
exactly the things we do. The StateUpdateService (TODO) will listen for state
change events emitted by the TimerManager and the UserManager, and will call
the appropriate methods of this class to send the appropriate state updates
to the appropriate clients.
*/
export class WebSocketManager {
  private connections: Map<string, {
    ws: ElysiaWS<any, any, any>,
    lastPing: number
  }> = new Map();
  
  private readonly HEARTBEAT_INTERVAL = 30000; // 30 seconds
  private readonly HEARTBEAT_TIMEOUT = 60000;  // 60 seconds
  
  constructor() {
    // Start the heartbeat check interval
    setInterval(() => this.checkHeartbeats(), this.HEARTBEAT_INTERVAL);
  }

  addConnection(timerId: string, ws: ElysiaWS<any, any, any>) {
    ws.subscribe(timerId);
    this.connections.set(ws.id, {
      ws,
      lastPing: Date.now()
    });
  }

  removeConnection(timerId: string, ws: ElysiaWS<any, any, any>) {
    ws.unsubscribe(timerId);
    this.connections.delete(ws.id);
  }

  updateHeartbeat(ws: ElysiaWS<any, any, any>) {
    const conn = this.connections.get(ws.id);
    if (conn) {
      conn.lastPing = Date.now();
    }
  }

  private checkHeartbeats() {
    const now = Date.now();
    for (const [id, conn] of this.connections.entries()) {
      if (now - conn.lastPing > this.HEARTBEAT_TIMEOUT) {
        // Connection is stale, force close it
        console.log(`Closing stale connection: ${id}`);
        try {
          conn.ws.close();
        } catch (e) {
          console.error('Error closing stale connection:', e);
        }
        this.connections.delete(id);
      }
    }
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