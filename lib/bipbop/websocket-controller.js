/* globals bipbop, WebSocket */
import bipbopFreeKey from './bipbop-free';

export default class BipbopWebSocket {
  static open(apiKey = bipbopFreeKey, onMessage, onConnect) {
    return (...args) => new BipbopWebSocket(apiKey, onMessage, onConnect).send(...args);
  }

  constructor(apiKey, onMessage, onOpen) {
    this.apiKey = apiKey;

    this.onMessage = onMessage;
    this.onOpen = onOpen;

    this.queue = [];
    this.ws = null;
    this.start();
  }

  send(data, onSend) {
    if (typeof data === 'string') this.apiKey = data;

    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(data));
      if (onSend) onSend();
      return true;
    }

    this.queue.push([data, onSend]);
    return false;
  }

  start() {
    this.ws = new WebSocket(bipbop.websocketAddress);

    this.ws.onmessage = (event) => {
      if (this.onMessage && event.data) this.onMessage(JSON.parse(event.data), event);
    };

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(this.apiKey));
      while (this.queue.length) this.send(...this.queue.shift());
      if (this.onOpen) this.onOpen(this.ws);
    };

    this.ws.onerror = () => this.ws.close();
    this.ws.onclose = () => setTimeout(() => this.start(), bipbop.reconnectAfter);
  }
}
