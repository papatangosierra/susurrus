interface WebSocketMessage {
  type: string;
  payload?: {
    timerId?: string;
    duration?: number;
    name?: string;
    user?: string;
  };
}

export { WebSocketMessage };