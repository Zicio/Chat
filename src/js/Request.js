export default class Request {
  constructor() {
    this.url = new URL('https://zicio-chat.herokuapp.com/users/');
  }

  async checkName(name) {
    const url = `${this.url}${name}`;
    const response = await fetch(url);
    return response;
    // this.url.searchParams.delete('id');
    // return ticket[0];
  }

  async postTicket(method, id, form) {
    switch (method) {
      case 'createTicket':
        this.url.searchParams.set('method', 'createTicket');
        break;
      case 'deleteTicket':
        this.url.searchParams.set('method', 'deleteTicket');
        break;
      case 'changeTicket':
        this.url.searchParams.set('method', 'changeTicket');
        break;
    }
    if (id) {
      this.url.searchParams.append('id', `${id}`);
    }
    let response;
    if (form) {
      response = await fetch(this.url.href, {
        method: 'POST',
        body: new FormData(form),
      });
    } else {
      response = await fetch(this.url.href);
    }
    this.url.searchParams.delete('id');
    return response;
  }
}
