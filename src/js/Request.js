import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = new URL('https://zicio-chat.herokuapp.com/'); // 'http://localhost:7000/'
    this.ws = null;
  }

  async checkName(name) {
    const url = `${this.url}users/${name}`;
    const response = await fetch(url);
    return response;
  }

  getWS() {
    const { url } = this;
    const host = url.href.replace(/^https/, 'wss'); // ^http/, 'ws'
    const ws = new WebSocket(host);
    ws.onopen = console.log('ONLINE');
    this.ws = ws;
  }

  // sendMessage(message) {
  //   this.ws.onopen = () => this.ws.send(JSON.stringify(message));
  //   this.ws.onmessage = (response) => {
  //     console.log(response.data);
  //   };
  //   this.ws.onclose = console.log('OFFLINE');
  // }

  connectWS(msg) {
    this.ws.onopen = () => this.ws.send(JSON.stringify(msg));
    if (!msg) {
      this.ws.onmessage = (response) => DOM.showUsers(JSON.parse(response.data));
    }
    // else {
    // TODO обработчик показа сообщений
    // }
    this.ws.onclose = console.log('OFFLINE');
  }
}
