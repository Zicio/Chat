import Request from './Request';
import DOM from './DOM';

export default class Logic {
  constructor(element) {
    this.element = element;
    this.request = new Request();

    this.start();
    this.listener();
  }

  async start() {
    const tickets = await this.request.getTickets();
    DOM.showTickets(tickets);
  }

  listener() {
    this.element.addEventListener('click', (e) => this.eventHandler(e));
  }

  eventHandler(e) {
    // Кнопка "Добавить тикет"
    if (e.target.classList.contains('desk__add-button')) {
      DOM.showPopup('Добавить тикет');
      return;
    }
    // Кнопка "Отмена"
    if (e.target.classList.contains('cancel-button')) {
      DOM.showPopup();
      return;
    }
    // Кнопка "Изменить тикет"
    if (e.target.classList.contains('ticket__change')) {
      this.change(e);
      return;
    }
    // Кнопка "Удалить тикет"
    if (e.target.classList.contains('ticket__delete')) {
      DOM.showPopup('Удалить тикет', null, e);
      return;
    }
    // Раскрыть/скрыть описание
    if (e.target.classList.contains('ticket')) {
      this.expand(e);
      return;
    }
    // Кнопка "ОК" при добавлении тикета
    if (e.target.classList.contains('ok-button') && e.target.closest('.popup').querySelector('.popup__title').textContent === 'Добавить тикет') {
      e.preventDefault();
      this.sendTicket(e);
      return;
    }
    // Кнопка "ОК" при удалении тикета
    if (e.target.classList.contains('ok-button') && e.target.closest('.popup').querySelector('.popup__title').textContent === 'Удалить тикет') {
      e.preventDefault();
      this.deleteTicket(e);
      return;
    }
    // Кнопка "ОК" при удалении тикета
    if (e.target.classList.contains('ok-button') && e.target.closest('.popup').querySelector('.popup__title').textContent === 'Изменить тикет') {
      e.preventDefault();
      this.changeTicket(e);
      return;
    }
    // Кнопка изменения состояния тикета
    if (e.target.classList.contains('ticket__check')) {
      this.checkTicket(e);
    }
  }

  async change(e) {
    const response = await this.requestTicket(e);
    DOM.showPopup('Изменить тикет', response, e);
  }

  async expand(e) {
    const description = e.target.querySelector('.ticket__description');
    if (description) {
      description.remove();
      return;
    }
    const response = await this.requestTicket(e);
    DOM.showDescription(e, response);
  }

  async requestTicket(e) {
    const ticket = e.target.closest('.ticket');
    const id = ticket.querySelector('.ticket__check').getAttribute('id');
    const response = await this.request.getTicket(id);
    return response;
  }

  async sendTicket(e) {
    const popup = e.target.closest('.popup');
    const form = popup.querySelector('.popup__form');
    const response = await this.request.postTicket('createTicket', null, form);
    if (response.ok) {
      DOM.showPopup();
      this.start();
    }
  }

  async deleteTicket(e) {
    const id = e.target.dataset.ticketId;
    const response = await this.request.postTicket('deleteTicket', id);
    if (response.ok) {
      DOM.showPopup();
      this.start();
    }
  }

  async changeTicket(e) {
    const id = e.target.dataset.ticketId;
    const popup = e.target.closest('.popup');
    const form = popup.querySelector('.popup__form');
    const response = await this.request.postTicket('changeTicket', id, form);
    if (response.ok) {
      DOM.showPopup();
      this.start();
    }
  }

  checkTicket(e) {
    const id = e.target.getAttribute('id');
    this.request.postTicket('changeTicket', id);
  }
}
