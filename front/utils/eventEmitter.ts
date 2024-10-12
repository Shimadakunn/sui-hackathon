// Define a generic type for the event handler
type EventHandler<T extends unknown[] = unknown[]> = (...args: T) => void;

class EventEmitter {
  private events: { [key: string]: EventHandler[] } = {};

  on<T extends unknown[]>(event: string, handler: EventHandler<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler as EventHandler);
  }

  emit<T extends unknown[]>(event: string, ...args: T) {
    const handlers = this.events[event];
    if (handlers) {
      handlers.forEach((handler) => (handler as EventHandler<T>)(...args));
    }
  }

  off<T extends unknown[]>(event: string, handler: EventHandler<T>) {
    const handlers = this.events[event];
    if (handlers) {
      this.events[event] = handlers.filter((h) => h !== handler);
    }
  }
}

export const eventEmitter = new EventEmitter();
