import { TimerManager } from "./timerManager";
import { UserManager } from "./userManager";
import { WebSocketManager } from "./webSocketManager";

export class StateUpdateService {
  constructor(
    private timerManager: TimerManager,
    private userManager: UserManager,
    private wsManager: WebSocketManager
  ) {
    this.setupListeners();
  }

  private setupListeners() {
    this.timerManager.on('userAddedToTimer', ({ user, timer, ws }) => {
      console.log("caught userAddedToTimer event for user: ", user.name);
      this.wsManager.addConnection(timer.id, ws);
      this.wsManager.sendToUser({ user: user, timer: timer }, ws);
      this.wsManager.broadcastToTimer(timer.id, { timer: timer }, ws);
    });

    this.timerManager.on('userRemovedFromTimer', ({timer, ws }) => {
      console.log("caught userRemovedFromTimer event. New owner: ", timer.owner.name);
      this.wsManager.removeConnection(timer.id, ws);
      this.wsManager.broadcastToTimer(timer.id, { timer }, ws);
    });

    this.timerManager.on('lastUserRemovedFromTimer', ({timer, ws }) => {
      this.wsManager.removeConnection(timer.id, ws);
    });

    this.timerManager.on('timerCreated', ({ timer, ws }) => {
      console.log("caught timerCreated event for timer owned by: ", timer.owner.name);
      this.wsManager.addConnection(timer.id, ws);
      this.wsManager.sendToUser({user: timer.owner, timer: timer }, ws);
    });


  }
}