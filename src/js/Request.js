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
    const host = url.href.replace(/^https/, 'wss'); // /^http/, 'ws'
    const ws = new WebSocket(host);
    this.ws = ws;
    this.ws.onopen = console.log('ONLINE');
    this.ws.onmessage = (response) => Request.responseHandler(JSON.parse(response.data));
  }

  firstSendWS(msg) {
    this.ws.onopen = () => this.ws.send(JSON.stringify(msg));
  }

  sendWS(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  static responseHandler(response) {
    if (Object.prototype.hasOwnProperty.call(response, 'users')) {
      DOM.showUsers(response.users);
      DOM.showMessages(response.messages);
      return;
    }
    if (response.id) {
      DOM.deleteUserOffline(response);
      return;
    }
    if (response[0].id) {
      DOM.showUsers(response);
      return;
    }
    DOM.showMessages(response);
  }
}
