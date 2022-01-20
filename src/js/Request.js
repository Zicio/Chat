import DOM from './DOM';

export default class Request {
  constructor() {
    this.url = new URL('http://zicio-chat.herokuapp.com/');
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
    const host = url.href.replace(/^http/, 'ws');
    const ws = new WebSocket(host);
    ws.onopen = console.log('ONLINE');
    ws.onmessage = (response) => {
      if (response.name) {
        DOM.showUsers(response);
      }
    };
  }
}
