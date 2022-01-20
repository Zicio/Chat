import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = new URL('https://zicio-chat.herokuapp.com/users/');
    // this.ws = new WebSocket('wss://zicio-chat.herokuapp.com/users/');
  }

  async checkName(name) {
    const url = `${this.url}${name}`;
    const response = await fetch(url);
    return response;
  }

  async sendMessage() {
    console.log(`${this.url}`);
  }

  static connectWS() {
    const ws = new WebSocket('ws://zicio-chat.herokuapp.com/');
    ws.onopen = console.log('ONLINE');
    ws.onmessage = (response) => {
      if (response.name) {
        DOM.showUsers(response);
      }
    };
  }
}
