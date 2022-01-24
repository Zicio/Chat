import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = new URL('https://zicio-chat.herokuapp.com/');
  }

  async checkName(name) {
    const url = `${this.url}users/${name}`;
    const response = await fetch(url);
    return response;
  }

  async sendMessage() {
    console.log(`${this.url}`);
  }

  connectWS() {
    const { url } = this;
    const host = url.href.replace(/^https/, 'wss');
    const ws = new WebSocket(host);
    ws.onopen = console.log('ONLINE');
    ws.onmessage = (response) => {
      DOM.showUsers(JSON.parse(response.data));
    };
    ws.onclose = console.log('OFFLINE');
  }
}
