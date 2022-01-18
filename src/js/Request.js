export default class Request {
  constructor() {
    this.url = new URL('https://zicio-heroku.herokuapp.com/');
  }

  async getTickets() {
    this.url.searchParams.set('method', 'allTickets');
    const response = await fetch(this.url.href);
    let tickets;
    if (response.ok) {
      tickets = await response.json();
      console.log(tickets);
    }
    return tickets;
  }

  async getTicket(id) {
    this.url.searchParams.set('method', 'ticketById');
    this.url.searchParams.append('id', `${id}`);
    const response = await fetch(this.url.href);
    let ticket;
    if (response.ok) {
      ticket = await response.json();
      console.log(ticket);
    }
    this.url.searchParams.delete('id');
    return ticket[0];
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
