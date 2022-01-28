import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = new URL('http://localhost:7000/');
    this.ws = null;
  }

  async checkName(name) {
    const url = `${this.url}users/${name}`;
    const response = await fetch(url);
    return response;
  }

  getWS() {
    const { url } = this;
    const host = url.href.replace(/^http/, 'ws');
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
    this.ws.onopen = () => this.ws.send(JSON.stringify(''));
    this.ws.onmessage = (response) => {
      DOM.showUsers(JSON.parse(response.data));
    };
    this.ws.onclose = console.log('OFFLINE');
  }
}
