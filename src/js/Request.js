import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = new URL('https://zicio-chat.herokuapp.com/');
    this.ws = null;
  }

  async checkName(name) {
    const url = `${this.url}users/${name}`;
    const response = await fetch(url);
    return response;
  }

  getWS() {
    const { url } = this;
    const host = url.href.replace(/^https/, 'wss');
    const ws = new WebSocket(host);
    ws.onopen = console.log('ONLINE');
    this.ws = ws;
  }

  // static sendMessage(ws, message) {
  //   ws.onopen = () => ws.send(message);
  //   ws.onmessage = (response) => {
  //     console.log(response.data);
  //   };
  //   ws.onclose = console.log('OFFLINE');
  // }

  connectWS() {
    this.ws.onmessage = (response) => {
      DOM.showUsers(JSON.parse(response.data));
    };
    this.ws.onclose = console.log('OFFLINE');
  }
}
