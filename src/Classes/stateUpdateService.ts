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
      // if this is the only user in the timer, set the owner to the user
      if (timer.users.length === 1) {
        timer.setOwner(user);
      }
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
      console.log("caught lastUserRemovedFromTimer event. New owner: ", timer.owner.name);
      this.wsManager.removeConnection(timer.id, ws);
    });

    this.timerManager.on('timerCreated', ({ timer, ws }) => {
      console.log("caught timerCreated event for timer owned by: ", timer.owner.name);
      this.wsManager.addConnection(timer.id, ws);
      this.wsManager.sendToUser({user: timer.owner, timer: timer }, ws);
    });


  }
}